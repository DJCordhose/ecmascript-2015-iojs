//https://github.com/lukehoban/es6features#map--set--weakmap--weakset
//http://www.2ality.com/2015/01/es6-maps-sets.html
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet

// MAP

const map = new Map();

// keys are not restricted to strings
const KEY1 = {name: 'KEY1'};
const KEY2 = 'KEY2';

map.set(KEY1, 1);
console.log(map.get(KEY1)); // 1
console.log(map.has(KEY1)); // true

map.set(KEY2, 2);

// entries, keys, and values return iterators
for (let e of map.entries()) {
    console.log(e); // array consisting of key and value
}
//[ { name: 'KEY1' }, 1 ]
//[ 'KEY2', 2 ]

for (let e of map.keys()) {
    console.log(e); // keys only
}
//{ name: 'KEY1' }
//KEY2

for (let e of map.values()) {
    console.log(e); // values only
}
//1
//2

console.log(map.size); // 2

map.delete(KEY1);
console.log(map.has(KEY1)); // false

// WEAK MAP

// A `WeakMap` is like a `Map` with a limited API. Only `get`, `set`, `has`, and `delete` are supported.
// Different from maps keys for weak maps must be objects. Entries in the weak map are only valid as long as their keys
// still live, that is not collected by garbage collection. Because weak maps have no API to show their internal state,
// it is very hard to come up with an example that is reasonable out of context. On such context would be to store
// additional information for a DOM node and as soon as this node is garbage collection, the additional information
// disappears from the weak map.

const wm = new WeakMap();
let domNode = {}; // this is not a real dom node, of course
wm.set(domNode, 'additional information');
domNode = null;
// it is impossible to use has to find out if the entry is still in the WeakMap, because we no longer have a reference
// to the key, but once the garbage collection has run, it will be gone