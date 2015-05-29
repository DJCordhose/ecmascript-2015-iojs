# ECMAScript 2015 on io.js 

**WORK IN PROGRESS, we plan to update this description as ECMAScript 2015 support in io.js evolves.**

## Introduction
ECMAScript 2015, also known as ECMAScript 6 or ES6 for short, is the upcoming version of the ECMAScript standard. 
[io.js already supports](http://kangax.github.io/compat-table/es6/#iojs) a significant number of features of this 
standard natively, that is without any kind of transpiling.

Inspired by style and content of this really nice 
[overview of ES6 features by Luke Hoban](https://github.com/lukehoban/es6features), here you can find an overview of what is
supported in io.js already. [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript) was used as a normative reference. 

All of the examples below can also be found in the `features` folder as individual runnable applications. You can run an example using the prepared `run.sh` script which expects the path to an example
as its first parameter. When you are in the base directory, 
running the first example from the command line would look this this:

> ./run.sh features/1-let-const.js

Note: `run.sh` automatically switches on all [ES6 features](https://iojs.org/es6.html) of `io.js` even when they are not mature, yet. Note that
the examples need at least version 2.0 of io.js.

In the `workshop` folder you can try the new features on a complete example.

## Overview
io.js as of release 2.0 (partially) supports the following new features:

Feature                                               | Command line switch needed to enable
----------------------------------------------------- | -------------------------------------
[let + const](#let--const)                            | already enabled
[for..of](#forof)                                     | already enabled
[template strings](#template-strings)                 | already enabled
[arrow functions](#arrow-functions)                   | `--harmony_arrow_functions`
[enhanced object literal](#enhanced-object-literal)   | already enabled (`--harmony-computed-property-names` for computed property names)                 
[keyed collections](#keyed-collections)               | already enabled
[classes](#classes)                                   | already enabled (`--harmony-computed-property-names` for computed property names)   
[rest parameters](#rest-parameters)                   | `--harmony-rest-parameters`
[Promise](#promise)                                   | already enabled
[Symbol](#symbol)                                     | already enabled
[iterators and generators](#iterators-and-generators) | already enabled
Destructuring                                         | not supported
Default values                                        | not supported
Spread operator                                       | not supported
Proxy and Reflect                                     | not supported
tail call optimisation                                | not supported

### Let + Const
Blocks now create scopes for `let` and `const`. Semantics of `var` remain unchanged.

```JavaScript
// a simple block, not a function or IIFE
{
    // error: there is no hoisting, you can not use x before definition
    console.log(x);
    let x = "outer";
    console.log(x);
    {
        // okay, block scoped name
        const x = "sneaky";
        // error: you can not re-assign a const variable
        x = "foo";
        // error: you can assign a value to a const variable only on initialization
        const y;
        y = 10;
    }
    // error: already declared in block
    let x = "inner";

}

// error: x is only defined inside block
console.log(x);
```

### For..Of
Instead of iterating of the index using `for..in`, you can now directly iterate over the elements in an array using
`for..of`. `for..of` not only works for arrays, but for every object that is `iterable`. 
[We will explain later what being `iterable` means](#iterators-and-generators).

```JavaScript
const programmers = ['Granny', 'Olli'];

// this iterates over the indices ...
// outputs 0, 1
for (let i in programmers) {
    console.log(i);
}


// ... while this ES6 features iterates over the elements (what you probably desire)
// outputs Granny, Olli
for (let p of programmers) {
    console.log(p);
}
```

### Template strings

Using template strings you can embed expressions into strings and let them span multiple lines. They are enclosed by back tics (``) instead of quotation marks.

```JavaScript
const a = 5;
const b = 10;

// ES5
console.log("Fifteen is " + (a + b) + " and\nnot " + (2 * a + b) + ".");

// ES6
console.log(`Fifteen is ${a + b} and
not ${2 * a + b}.`);
```

### Arrow functions

Arrow functions offer both a shorter function syntax and a lexical `this`. The latter means that `this` inside the arrow function is bound to the value `this` had in the scope, the function was defined in. 

Unfortunately, only the shorter syntax works in `io.js` so far. And even therefore you have to enable it using the `--harmony_arrow_functions`
flag.

```JavaScript
// ES5
var es5 = function () {
    return 10;
}
console.log(es5()); // 10

// the same thing in ES6 arrow function notation
const es6 = () => {
    return 10;
}
console.log(es6()); // 10

// the same thing using a shorter syntax if the function only is a single expression
const es6_short = () => 10;
console.log(es6_short()) // 10

// basic syntax works in io.js, but no automatic binding to this
const obj = {
    methodOfObj: function () {
        ['1', '2', '3'].forEach( (e) => {
           console.log(obj === this); // true in firefox, false in io.js
        });
    }
};

obj.methodOfObj();
```

### Enhanced Object Literal
ES6 introduces some enhancements and simplifications to the Object Literal. You now can leave out a value for a property name,
if there is already an object defined with the same name as your property, i.e. it's enough to write `name` instead of `name:name`.
For functions declared on an object you can leave out the `:function()` notation and instead simply write the function name.
Using the special property name `__proto__` you can directly set the prototype of an object. Inside a function you can call `super()`
to invoke functions from it's prototype.

```JavaScript
const name = 'Lemmy';

const person = {
	name, // ES5: name: name

	toString() { // ES5: toString: function()
		return `This is ${this.name}`;
	}
};

const musician = {
	// change prototype
	__proto__: person,

	toString() {
		// call to super
		return `${super.toString()}, let's get loud`;
	}
}

console.log(person.name); // Lemmy
console.log(person.toString()); // This is Lemmy
console.log(musician.name); // Lemmy (note 'name' comes from person)
console.log(musician.toString()); // This is Lemmy, let's get loud
```

And it is even possible to use property names that are defined dynamically using a function call. Note that this feature requires the `--harmony-computed-property-names`
 switch to be set:

```JavaScript
function secretKey() {
	return 666;
}

const obj = {
	[ 'prop_' + secretKey() ]: 'Number of the beast'
}
console.log(obj.prop_666); // Number of the beast
```
### Classes

Beside the enhancements to the object literal ES6 also provide a new simplified way to write object-oriented code: classes.
Instead of using an object literal to define and inherit classes you can now use the dedicated `class` keyword. Within
classes you can specify a constructor and instance and static members and You can define getters and setters for your properties.
Inheritance is supported using the `extends` keyword.

Let's have a first look at a fairly simple class:
```JavaScript
class Person {
	constructor(name) {
		this.name = name;
	}

	toString() {
		return `I'm ${this.name}`;
	}
}

// create new instance of that class
const lemmy = new Person('Lemmy');

// access it's members
console.log(lemmy.toString()); // I'm Lemmy
console.log(lemmy.name); // 'Lemmy'
```

Now lets add `getter and setter` functions:
```JavaScript
class Person {
	constructor(name) {
		this.name = name;
		this._id = name.toLowerCase();
	}

	// read only property, note that the setter is missing
	get id() {
		return this._id;
	}

	// Example: getter and setters
	set password(password) {
		// store 'encrypted' password
		this.encryptedPassword = password.split('').reverse().join('');
	}

	get password() {
		// return 'decrypted' password
		return this.encryptedPassword.split('').reverse().join('');
	}

	toString() {
		return `I'm ${this.name}`;
	}
}

const lemmy = new Person('Lemmy');

// get the read-only property 'id'
console.log(lemmy.id); // 'lemmy'

// Try setting a read-only property
try {
	// Won't work, as id is a read-only property
	lemmy.id = 'kilmister';
} catch (e) {
	// ERROR: TypeError: Cannot set property id of [object Object] which has only a getter
	console.log(e);
}

lemmy.password = 'aceOfSpades';
console.log(lemmy.password); // aceOfSpades
console.log(lemmy.encryptedPassword); //sedapSfOeca
```

And finally let's introduce class inheritance using the `extends` keyword:
```JavaScript
class Musician extends Person {
	constructor(name, instrument) {
		// invoke super constructor first
		super(name);
		this.instrument = instrument;
	}

	toString() {
		return `${super.toString()} and I'm playing ${this.instrument}`;
	}

	// You can define static methods
	static newGuitarPlayer(name) {
		return new Musician(name, 'Guitar');
	}
}

const mikkey = new Musician('Mikkey', 'Drums');
console.log(mikkey.toString()); // I'm Mikkey and I'm playing Drums
console.log((mikkey instanceof Person)); // true
console.log((mikkey instanceof Musician)); // true
console.log(Musician.newGuitarPlayer('Phil').toString()); // I'm Phil and I'm playing Guitar
```

And as with the object literal you can even use computed property names in your class. Note that you have to enable this feature
with the `--harmony-computed-property-names` flag when running iojs:

```JavaScript
function secretKey() {
	return 667;
}

class NeighbourHood {
	[ 'no_' + secretKey() ]() {
		return 'Neighbour of the beast';
	}
}

const hood = new NeighbourHood();
console.log(hood.no_667()); // Neighbour of the beast
```

### Keyed Collections

ES6 offers two new data structures and two variations of them: `Map`, `Set`, and `WeakMap` and `WeakSet` as their weak
variants. A `Map` can store a references from a key to value, much like an object, but more flexible. E.g. it can
use any value as a key, not only a string.

```JavaScript
const map = new Map();

// keys are not restricted to strings
const KEY1 = {name: 'KEY1'};
const KEY2 = 'KEY2';

map.set(KEY1, 1);
console.log(map.get(KEY1)); // 1
console.log(map.has(KEY1)); // true

map.set(KEY2, 2);
console.log(map.size); // 2

// maps are iterable objects
for (let e of map) {
    console.log(e); // array consisting of key and value, e.g. [ { name: 'KEY1' }, 1 ]
}

for (let e of map.keys()) {
    console.log(e); // keys only
}

for (let e of map.values()) {
    console.log(e); // values only
}

map.delete(KEY1);
console.log(map.has(KEY1)); // false
```

`Sets` only store values, disallowing doubles, but still keeping order. In some usecases they might be a replacement 
for arrays. 

```JavaScript
const set = new Set();

const VALUE1 = {name: 'VALUE1'};
const VALUE2 = 'VALUE2';

set.add(VALUE1);
console.log(set.has(VALUE1)); // true

set.add(VALUE2);
console.log(set.size); // 2

// sets are iterable objects
for (let e of set) {
    console.log(e);
}

set.delete(VALUE1);
console.log(set.has(VALUE1)); // false
```

`WeakMap` and `WeakSet` are weak variants of `Map` and `Set`. Entries in `WeakMap` and `WeakSet` are only 
valid as long as their keys (for maps) or values (for sets) still live, that is they are not collected by garbage collection.   
As a result of that they come with a limited API that only allows to get, set, test, and delete. They are not iterable.
Keys (for maps) or values (for sets) can only be objects. 

A usecase would be to store additional information for a DOM node and as soon as this node is garbage collection, 
the additional information disappears from the `WeakMap`.

```JavaScript
const weakMap = new WeakMap();
let domNode = {}; // this is not a real dom node, of course
weakMap.set(domNode, 'additional information');
domNode = null;
// it is impossible to use `has` to find out if the entry is still in the `WeakMap`,
// because we no longer have a reference
// to the key. But once the garbage collection has run, it will be gone
```

### Rest parameters
In ECMAScript 5 you can access all parameters that have been passed to a function using the special Array-like `arguments` object. In ES6
you can specify the last parameter of your function to be a `rest parameter` (using triple dot notation). This parameter collects
all ("the rest") parameters that have been passed to the method but have not been explicitly specified as arguments. In contrast
to the `arguments` object the rest parameter is a real JavaScript Array, so it's much easier to use.
Please make sure, that you enable the rest parameter with the switch `--harmony-rest-parameters`.

```JavaScript
function sendMessage(message, ...recipients) {
	// Note that recipients is a standard Array, you can immediately use all Array functions  
	// The first argument ('message') is not part of that array, as it is declared as this functions' argument
	recipients.sort().forEach((recipient) => {
		console.log(`${recipient}, ${message}`)
	});
}

sendMessage('Keep on rocking!', 'Lemmy', 'Ozzy', 'Angus');
```

*Caution:*
- Unfortunately, rest parameters do not work in combination with arrow functions in `io.js`, yet.
- ES6 also introduces the spread operator that also starts with `...`. This operator is currently not supported by iojs

### Promise

Promises are a general concept to chain together operations in asynchronous or deferred scenarios. 
A typical example would be a call to a server or a timed execution or a background calculation. 

As an example, we first create such a promise that carries out a deferred operation after one second.

```JavaScript
const promise = new Promise((resolve, reject) => {
    const resolvedValue = 'Result from promise';
    console.log('Promise initialized');
    setTimeout(() => {
        console.log('Promise resolved')
        resolve(resolvedValue)
    }, 1000);
});
// Output:
//Promise initialized
//Promise resolved
```

To create such a promise we call the constructor and pass in a function that takes two callbacks - one to
successfully resolve the promise and another to make it fail. In this case we call the `resolve` callback
to make it succeed after one second. We have thus created a promise that simply returns the string 
`Result from promise` after a second. 

This only makes sense if we chain another operation to the promise to make use of the returned value. Just imagine
the value has been calculated using a complex background calculation to make it more realistic. We chain together
operations using the `then` method. It takes a callback function as an argument that will be called once the value
of the promise is resolved.

```JavaScript
const promise2 = promise.then(value => {
    console.log(`Value passed into then: ${value}`); // Value passed into then: Result from promise
    return `${value} plus stuff`;
});
```

In this case we return a new value based on the first one and the `then` method will create a new promise based on that.
This means we can chain another operation to this, that might just log out the new value:
 
```JavaScript
promise2.then(console.log); // Result from promise plus stuff
```

This is a little bit like a programmable semicolon, as we chain together statements using the special semantics
of a promise.

You can catch errors using the `catch` method. Once an explicit rejection or an error occurs, the cause will be
passed into the function provided:

```JavaScript
Promise
    //.resolve(10) // creates and directly resolves promise
    .reject('kaputt') // creates and directly rejects promise
    .then(x => {
        console.log(x);
        throw Error('Something went wrong');
    })
    .then(() => {
        console.log('This will not be printed when rejected or an error occurred before');
    })
    .catch(e => console.log('error: ', e))
```

Additionally, `io.js` allows you to [catch all unhandled errors from promises](http://blog.modulus.io/promise-errors-in-iojs)

*Note for people with a background in functional programming: A JavaScript `Promise` is a bit like a 
[monad](http://en.wikipedia.org/wiki/Monad_(functional_programming)). 
`then` would be the `bind` operation. And the `return` operation would be the `Promise` constructor in combination with the `resolve` method
or [Promise.resolve](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)
as a shortcut of this.* 

### Symbol

ES6 introduced a new primitive datatype `symbol`. Using symbols you can create unique "identifiers" as each symbol is unique and immutable:

```JavaScript
const one = Symbol();
const two = Symbol();
console.log(one !== two); // true
```

For debugging purposes you can add a description to a symbol:
```JavaScript
const one = Symbol('My symbol');
const two = Symbol('Another symbol');

// Even two symbols with the same description are unique:
const good = Symbol('mood');
const bad = Symbol('mood');
console.log(good !== bad); // true
```

Its main use case is to serve as an identifier for object properties. Using symbols instead of strings allows you to implement private properties:

```JavaScript
const Person = () => { // IIFE using arrow function
    // private
    const nameSymbol = Symbol('name'); // name is optional
    console.log(typeof nameSymbol); // symbol

    class Person {

        constructor(name) {
            this[nameSymbol] = name;
        }

        get name() {
            return this[nameSymbol];
        }
    }

    return Person;
}();

const olli = new Person("Olli");

console.log(olli.name); // Olli

// error as nameSymbol is out of scope
console.log(olli[nameSymbol])
```

In this example we made it impossible to change the name property of objects of class `Person`. To be more precise,
it is not really impossible, as you can still access all symbols of an object using the new introduced method `Object.getOwnPropertySymbols` if you really want to:

```JavaScript
const ownPropertySymbols = Object.getOwnPropertySymbols(olli);
console.log(ownPropertySymbols); // [ Symbol(name) ]

// still possible to access private property if you really want
olli[ownPropertySymbols[0]] = 'Granny';
console.log(olli.name);  // Granny
```

*Note: There are a couple of 
[well-known symbols](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-well-known-symbols) that are defined
as static values on `Symbol`. In the specification they are referred to using `@@name`. 
One example is `Symbol.iterator` (referred to as `@@iterator` in the spec) which is described in the next section.*

### Iterators and Generators

[for..of as described above](#forof) can iterate over every object that is `iterable`. An object is `iterable`
if it has a method that returns an `iterator`. This `iterator`-method does not have a name, but is 
accessed using the well-known symbol `Symbol.iterator`. 
The returned `iterator` is an object that has a method called `next`. 
The return value of the `next` function is another object that has a `value` property (representing the actual value of this element), plus a boolean property `done` that indicates if there are still more values to iterate over.
 
Ok, this gets a little involved, let us see some code to create such an `iterable`. This example `iterable` can
provide us with an endless list of unique names by using `name` as prefix and a count as suffix. The count is increased with each iteration (i.e. invocation of the `next` function). 

```JavaScript
const uniqueNamesIterable = {

    // The name of the iterator-function is derived from a computed property value - it is NOT 'iterator':
    [Symbol.iterator]() {
        let count = 0;
        const prefix = 'name';
        const iterator = {
            next() {
                const value = prefix + count++;
                return {done: false, value};
            }
        };
        return iterator;
    }
};
```

`for..of` will initially create an `iterator` by calling the method behind `Symbol.iterator` and will then
call `next` on that `iterator` with every iteration:

```JavaScript
for (let name of uniqueNamesIterable) {
    // we just want three names
    if (name.endsWith('3')) break;
    console.log(name);
}
// outputs:
// name0
// name1
// name2
```

For transparency, we can simulate this behavior by doing the same thing manually using the `next` function of the iterator:

```JavaScript
const iterator = uniqueNamesIterable[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
// outputs:
// { done: false, value: 'name0' }
// { done: false, value: 'name1' }
```

As long as 'done' is false, `for..of` will keep on going.

*Note: The spread operator `...` - which has not been implemented in io.js, yet - uses the same 
protocol to enumerate all values of an `iterable`.* 

*Generators* can help to simplify this by reducing a bit of boiler plate code. A generator both creates the
`iterator` and supplies its implementation. To indicate that a function is a generator, 
you use the `function*` declaration (note the star after the `function` keyword).

This code does the same thing as the example before:

```JavaScript
const uniqueNamesIterable = {
    [Symbol.iterator]: function* () {
        let count = 0;
        const prefix = 'name';
        while (true) {
            const value = prefix + count++;
            yield value;
        }
    }
};
```

You no longer have to provide a `next`-method, but rather implement the 
generator in a sequential style. Instead of using `return` you use `yield` to provide values for iteration. 
The generator can also determine if we are done, yet, so you do not have to provide that information yourself.
