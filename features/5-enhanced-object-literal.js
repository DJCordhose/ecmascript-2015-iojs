'use strict';

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

function secretKey() {
	return 666;
}

const obj = {
	[ 'prop_' + secretKey() ]: 'Number of the beast'
}
console.log(obj.prop_666); // Number of the beast


