// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters

// ES5
{
	function sendMessage(message) {
		// arguments is NOT an array, needs to be converted first:
		// arguments contains ALL parameters including the first declared argument ('messsage'), so start
		// converting with second argument (index 1)

		var recipients = Array.prototype.slice.call(arguments, 1);

		recipients.sort().forEach(function (recipient) {
			console.log(recipient + ', ' + message);
		})
	}

	sendMessage('Keep on rocking!', 'Lemmy', 'Ozzy', 'Angus');
}

// ES6
{
	function sendMessage(message, ...recipients) {
		// Note that recipients is a standard Array.
		recipients.sort().forEach((recipient) => {
			console.log(`${recipient}, ${message}`)
		});
	}

	sendMessage('Keep on rocking!', 'Lemmy', 'Ozzy', 'Angus');
}

// ES6 fat arrow with rest parameters, not supported yet in io.js
{
	// error in io.js, works fine in firefox
/*
	const sendMessage = (message, ...recipients) => {
		// Note that recipients is a standard Array.
		recipients.sort().forEach((recipient) => {
			console.log(`${recipient}, ${message}`)
		});
	}
	sendMessage('Keep on rocking!', 'Lemmy', 'Ozzy', 'Angus');
*/

}
