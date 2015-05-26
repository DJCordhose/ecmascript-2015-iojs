//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of

const programmers = [];
programmers.push('Granny');
programmers.push('Olli');

// this iterates over the indices ...
// outputs 0, 1
for (let i in programmers) {
    console.log(i);
}


// ... while this ES6 features iterates over the elements (what you probably desire)
// outputs Granny, Olli
for (let p of programmers) {
    console.log(p);
}

