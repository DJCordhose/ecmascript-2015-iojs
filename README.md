# ECMAScript 2015 on io.js 

**WORK IN PROGRESS**

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
Destructuring                                         | not supported
Default values                                        | not supported
Spread operator                                       | not supported

### Let + Const
Blocks now create scopes for `let` and `const`. Semantics of `var` remain unchanged.

```JavaScript
// a simple block, not a function
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
`for..of`. `for..of` not only works for arrays, but for every object that is `iterable`. We will explain later
 what being `iterable` means.

```JavaScript
const programmers = [];
programmers.push('Granny');
programmers.push('Olli');

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

*Caution: Unfortunately, rest parameters do not work in combination with arrow functions.*

(Note that ES6 also introduces the spread operator that also starts with `...`. This operator is currently not supported by iojs)