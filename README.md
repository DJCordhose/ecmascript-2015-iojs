# ECMAScript 2015 on io.js 

**WORK IN PROGRESS**

## Introduction
ECMAScript 2015, also known as ECMAScript 6 or ES6 for short, is the upcoming version of the ECMAScript standard. 
[io.js already supports](http://kangax.github.io/compat-table/es6/#iojs) a significant number of features of this 
standard natively, that is without any kind of transpiling.

Inspired by stile and content of this really nice 
[overview of ES6 features by Luke Hoban](https://github.com/lukehoban/es6features) you can find an overview of what is
supported in io.js already. You can find all examples on the page in the `features` folder as well.

In the `exercise` folder you can try the new features on a complete example.

io.is (partially) supports the following new features:
- [let + const](#let--const)
- [for..of](#forof)
- [arrow functions](#arrow--functions)
- [template strings](#template-strings)

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

### Arrow functions

Arrow functions offer a shorter function syntax and a lexical `this`. This means `this` is inside the arrow function
is bound to the value `this` had in the scope the function was defined in. 

Unfortunately, only shorter syntax works in `io.js` so far. Even that you have to enable using `--harmony_arrow_functions`
flag.

```JavaScript
// ES5
var es5 = function() {
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
    methodOfObj: function() {
        return () => this;
    }
};

// true in firefox, false in io.js
console.log(obj.methodOfObj()() === obj);
```
