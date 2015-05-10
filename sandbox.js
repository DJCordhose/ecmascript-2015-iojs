'use strict'

class Person {
    constructor(name) {
        this.name = name
    }

    getName() {
        return this.name
    }
}

class Programmer extends Person {
    constructor(name, language) {
        super(name)
        this.language = language
    }
    code() {
        return Programmer.codes(this.name, this.language)
    }
    getName() {
        return `Coder:
${super.getName()}`
    }

    static codes(name, language) {
        return `${name} codes in ${language}`
    }

}

const olli = new Programmer('Olli', 'Cobol')
const name = olli.getName()
console.log(name)
const codes = olli.code()
console.log(codes)

//var [a,b] = [1,2]

// does not work with =>
var func = function(...params) {
    for (let param of params) {
        console.log(param)
    }
}

func(1,2,3)

const arr = [1,2,3]

//func(...arr)

let i = 0
const a = {
    ["foo" + ++i]: i,
    ["foo" + ++i]: i,
    ["foo" + ++i]: i
}

console.log(a.foo1)
console.log(a.foo2)
console.log(a.foo3)

const param = 'size'
const config = {
    [param]: 12,
    ["mobile" + param.charAt(0).toUpperCase() + param.slice(1)]: 4
}

console.log(config)

