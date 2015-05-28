// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
// does not work in io.js, yet, but in firefox

const target = {};
const handler = {
    get(receiver, name){
        return `Hello, ${name}!`
    }
};

const p = new Proxy(target, handler);
console.log(p.world === 'Hello, world!');
console.log(p.olli);
