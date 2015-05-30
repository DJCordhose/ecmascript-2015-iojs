// https://github.com/lukehoban/es6features#tail-calls
// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tail-position-calls

function factorial(n, acc) {
    acc = acc ? acc : 1;
    if (n <= 1) return acc;
    return factorial(n - 1, n * acc);
}

// Still stack overflows on io.js, works in firefox
console.log(factorial(100000)); // Infinity
