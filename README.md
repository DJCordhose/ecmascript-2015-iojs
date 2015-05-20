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
programmers.push('Oma');
programmers.push('Olli');

// this iterates over the indices ...
for (let i in programmers) {
    console.log(i);
}

// ... while this ES6 feature iterates over the elements (what you probably desire)
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



