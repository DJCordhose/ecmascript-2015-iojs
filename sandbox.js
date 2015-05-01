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
        return `Coder ${super.getName()}`
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
