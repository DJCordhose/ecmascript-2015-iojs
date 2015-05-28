// https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/function*

function* idMaker() {
    var index = 0;
    while (index < 3)
        yield index++;
}

var gen = idMaker();

//console.log(gen.next());
//console.log(gen.next());
//console.log(gen.next());
//console.log(gen.next());
//
for (let n of gen) {
    console.log(n);
}