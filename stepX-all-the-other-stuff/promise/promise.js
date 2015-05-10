const promise = new Promise((resolve) => {
    console.log('First promise initialized')
    setTimeout(() => resolve(0), 1000)
})
const promise3 = new Promise((resolve, reject) => {
    console.log('Third promise initialized')
    setTimeout(() => reject('No way!'), 10000)
})

promise.then((x) => {
    const number = 1;
    console.log(number, x)
    return number
}).then((x) => {
    const promise2 = new Promise((resolve) => {
        console.log('Second promise initialized')
        setTimeout(() => resolve(2), 5000)
    })
    const number = 2;
    console.log(number, x)
    return promise2
}).then((x) => {
    const number = 3;
    console.log(number, x)
    return promise3
}).catch((e) => {
    console.log('Rejected', e)
})
