// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/function*
// https://github.com/lukehoban/es6features#generators
// http://www.2ality.com/2015/02/es6-classes-final.html


const uniqueNamesIterable = {
    //[Symbol.iterator]: function* () {
    //    or
    * [Symbol.iterator]() {

        let count = 0;
        const prefix = 'name';
        while (true) {
            const value = prefix + count++;
            yield value;
        }
    }
};

const iterator = uniqueNamesIterable[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
// outputs:
// { done: false, value: 'name0' }
// { done: false, value: 'name1' }

for (let name of uniqueNamesIterable) {
    // we just want three names
    if (name.endsWith('3')) break;
    console.log(name);
}
// outputs:
// name0
// name1
// name2