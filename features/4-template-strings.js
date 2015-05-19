//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings

const a = 5;
const b = 10;

// ES5
console.log("Fifteen is " + (a + b) + " and\nnot " + (2 * a + b) + ".");

// ES6
console.log(`Fifteen is ${a + b} and
not ${2 * a + b}.`);