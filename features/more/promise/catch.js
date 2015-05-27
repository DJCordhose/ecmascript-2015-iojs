Promise
    .resolve(10)
    //.reject('kaputt')
    .then(x => Promise.resolve(x * 2))
    .catch(e => console.log('rejected: ', e))