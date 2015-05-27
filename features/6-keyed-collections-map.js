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
console.log(map.size); // 2

// maps are iterable objects
for (let e of map) {
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

map.delete(KEY1);
console.log(map.has(KEY1)); // false

// WEAK MAP

const weakMap = new WeakMap();
let domNode = {}; // this is not a real dom node, of course
weakMap.set(domNode, 'additional information');
console.log(weakMap.get(domNode) === 'additional information'); // true
domNode = null;
// it is impossible to use `has` to find out if the entry is still in the `WeakMap`,
// because we no longer have a reference
// to the key. But once the garbage collection has run, it will be gone