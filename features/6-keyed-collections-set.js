//https://github.com/lukehoban/es6features#set--set--weakmap--weakset
//http://www.2ality.com/2015/01/es6-maps-sets.html
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet

const set = new Set();

const VALUE1 = {name: 'VALUE1'};
const VALUE2 = 'VALUE2';

set.add(VALUE1);
console.log(set.has(VALUE1)); // true

set.add(VALUE2);
console.log(set.size); // 2

// sets are iterable objects
for (let e of set) {
    console.log(e);
}
//{ name: 'VALUE1' }
//VALUE2

set.delete(VALUE1);
console.log(set.has(VALUE1)); // false

// WEAK SET

const weakSet = new WeakSet();
let domNode = {}; // this is not a real dom node, of course
weakSet.add(domNode);
console.log(weakSet.has(domNode)); // true
domNode = null;
// it is impossible to use `has` to find out if the domNode is still in the `WeakSet`,
// because we no longer have a reference
// to the domNode. But once the garbage collection has run, it will be gone
