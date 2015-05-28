// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols
// https://github.com/lukehoban/es6features#iterators--forof

const uniqueNamesIterable = {
    [Symbol.iterator]() {
        let count = 0;
        const prefix = 'name';
        const iterator = {
            next() {
                const value = prefix + count++;
                return {done: false, value};
            }
        };
        return iterator;
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