//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol

// const nameSymbol = Symbol()

class Person {

    constructor(name) {
        this[nameSymbol] = name
    }

    getName() {
        return this[nameSymbol]
    }
}

console.log(typeof nameSymbol)

const olli = new Person("Olli")

console.log(olli.getName())

console.log(olli[nameSymbol])

const ownPropertySymbols = Object.getOwnPropertySymbols(olli);
console.log(ownPropertySymbols)

console.log(olli[ownPropertySymbols[0]])

