class Person {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}

class Programmer extends Person {
    constructor(name, language) {
        super(name);
        this.language = language;
    }

    code() {
        return Programmer.codes(this.getName(), this.language);
    }

    static codes(name, language) {
        return `${name} codes in ${language}`;
    }
}

const programmer = new Programmer('Olli', 'Cobol');
const programmers = new Set();
programmers.add(programmer);
programmers.add(new Programmer('Granny', 'Haskell'));

for (let p of programmers) {
    console.log(p.code());
}

// or

programmers.forEach(p => console.log(p.code()));

console.log(typeof p);