// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

// NOTE: Does not work in iojs yet. You can try the examples in Firefox

// Object destructuring
const operatorsModule = {
	multiply(a, b) {
		return a * b
	},
	add(a, b) {
		return a + b
	},
	subtract(a, b) {
		return a - b
	},
	divide(a, b) {
		return a / b
	}
};

// without destructuring (e.g. ES5)
{
	const add = operatorsModule.add;
	const divide = operatorsModule.divide;
	console.log(add(3, 4)); // 7
	console.log(divide(10, 5)); // 2
}

// with destructuring
{
	const {add, divide} = operatorsModule;
	console.log(add(3, 4)); // 7
	console.log(divide(10, 5)); // 2
}
// ...you can re-assign the names from the source object using a colon to separate old and new names:
{
	const {add: addOperator, divide: divideOperator} = operatorsModule;
	console.log(addOperator(3, 4)); // 7
	console.log(divideOperator(10, 5)); // 2
}

// Array Destructuring
// You can use array destructuring to assign elements of an array to indivdual variables
// Es5
{
	const lemmy = ['Lemmy', 'Kilmister', 'Motörhead']
	const name = lemmy[0];
	const lastname = lemmy[1];
	const band = lemmy[2];

	console.log(`${name} ${lastname} plays in ${band}`); // Lemmy Kilmister plays in Motörhead
}

// With destructuring
{
	const lemmy = ['Lemmy', 'Kilmister', 'Motörhead']
	const [ name, lastname, band ] = lemmy;
	console.log(`${name} ${lastname} plays in ${band}`); // Lemmy Kilmister plays in Motörhead
}
// ... you can even skip values from an array by leaving out a parameter name:
{
	const lemmy = ['Lemmy', 'Kilmister', 'Motörhead']
	const [ name, , band ] = lemmy;// not the , ,
	console.log(`${name} plays in ${band}`); // Lemmy Kilmister plays in Motörhead
}