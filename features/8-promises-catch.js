// http://blog.modulus.io/promise-errors-in-iojs

// all good
Promise
    .resolve(10) // creates and directly resolves promise
    //.reject('kaputt') // creates and directly rejects promise
    .then(x => {
        console.log(x);
        //throw Error('Something went wrong');
    })
    .then(() => {
        console.log('This will not be printed when an error occurred before');
    })
    .catch(e => console.log('error: ', e))

// rejection
/*
Promise
    //.resolve(10)
    .reject('kaputt')
    .then(x => {
        console.log(x);
        throw Error('Something went wrong');
    })
    .then(() => {
        console.log('This will not be printed when an error occurred before');
    })
    .catch(e => console.log('error: ', e))
*/

// error
/*
Promise
    .resolve(10)
    //.reject('kaputt')
    .then(x => {
        console.log(x);
        throw Error('Something went wrong');
    })
    .then(() => {
        console.log('This will not be printed when an error occurred before');
    })
    .catch(e => console.log('error: ', e))
*/
