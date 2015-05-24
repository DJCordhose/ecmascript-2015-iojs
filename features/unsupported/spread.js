// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
// Not supported in iojs yet. Use can run this example in Firefox

// The spread operator 'expands' an Array into it's individual elements. It can be used for array declarations
// (i.e. combine to or more arrays) or for function calls (for example as a replacement for apply)
// Using the spread operator to add elements of one array to another by 'expanding' the array:

const someNumbers = [ 'Three', 'Four', 'Five' ];
const moreNumbers = [ 'One', 'Two' ,...someNumbers, 'Six', 'Seven'];

console.log(moreNumbers); // Array [ "One", "Two", "Three", "Four", "Five", "Six", "Seven" ]

// Invoking a function with arguments from an array. The array elements are 'exploded' to arguments of the function
function add(a, b) {
	return a + b;
}

const numbers = [7, 12];
// ES5:
console.log(add.apply(null, numbers)); // 19
// ES6:
console.log(add(...numbers)); // 19




