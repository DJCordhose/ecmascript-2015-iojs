# ECMAScript 2015 on io.js 

**WORK IN PROGRESS**

## Introduction
ECMAScript 2015, also known as ECMAScript 6 or ES6 for short, is the upcoming version of the ECMAScript standard. 
[io.js already supports](http://kangax.github.io/compat-table/es6/#iojs) a significant number of features of this 
standard natively, that is without any kind of transpiling.

Inspired by stile and content of this really nice 
[overview of ES6 features by Luke Hoban](https://github.com/lukehoban/es6features) you can find an overview of what is
supported in io.js already. [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript) was used as a normative reference. 

You can find all examples in the `features` folder as well. You can run each example in that folder using the prepared `run.sh` script which expects a path to the example
as its first parameter. When you are in the base directory, 
running the first example from the command line would look this this

> ./run.sh features/1-let-const.js

`run.sh` switches on all ES6 features of `io.js` even when they are not mature, yet.

In the `workshop` folder you can try the new features on a complete example.

io.is (partially) supports the following new features:
- [let + const](#let--const)
- [for..of](#forof)
- [template strings](#template-strings)
- [arrow functions](#arrow-functions)

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

// ... while this ES6 features iterates over the elements (what you probably desire)
for (let p of programmers) {
    console.log(p);
}
```

### Template strings

Using template strings you can embed expressions into them and let them span multiple lines.

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

Arrow functions offer a shorter function syntax and a lexical `this`. This means `this` is inside the arrow function
is bound to the value `this` had in the scope the function was defined in. 

Unfortunately, only shorter syntax works in `io.js` so far. Even that you have to enable using `--harmony_arrow_functions`
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

// basic syntax does work, but no automatic binding to this
const obj = {
    methodOfObj: function () {
        return () => this;
    }
};

// true in firefox, false in io.js
console.log(obj.methodOfObj()() === obj);
```

