// Default values
// https://developer.mozilla.org/docs/Web/JavaScript/Reference/Functions/Default_parameters
// NOTE: Does not work in iojs yet. You can try the examples in Firefox

function ask(name, greeting = 'How do you do?') {
	console.log(`Hi, ${name}! ${greeting}`);
}

ask('Ivica'); // Hi, Ivica! How do you do?
ask('Peter', 'How are you?') // Hi, Peter! How are you?