// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/class
// http://www.2ality.com/2015/02/es6-classes-final.html

'use strict';

// Use 'class' to define a new class
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

// create new instance of that class
const lemmy = new Person('Lemmy');

// Access it's memebers
console.log(lemmy.toString()); // I'm Lemmy
console.log(lemmy.id); // 'lemmy'

// Try getting a read-only property
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

// You can easily create subclasses using the `extends` keyword:
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

// And like in the enhanced object literal you can even use computed property names using the square bracket notation:
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



