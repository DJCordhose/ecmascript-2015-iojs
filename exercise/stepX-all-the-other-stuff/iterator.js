// https://github.com/lukehoban/es6features
// https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Iteration_protocols

const fibonacci = {
    [Symbol.iterator]() {
        let pre = 0, value = 1;
        return {
            next() {
                const next = pre + value;
                pre = value;
                value = next;
                return {done: false, value};
            }
        }
    }
}

for (let n of fibonacci) {
    // truncate the sequence at 1000
    if (n > 1000)
        break;
    console.log(n);
}