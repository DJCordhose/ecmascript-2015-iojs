//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

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
        ['1', '2', '3'].forEach( (e) => {
           console.log(obj === this); // true in firefox, false in io.js
        });
    }
};

obj.methodOfObj();
