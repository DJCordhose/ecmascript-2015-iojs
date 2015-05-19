function Person(name) {
    this.name = name;
}
Person.prototype.getName = function () {
    return this.name;
};

function Programmer(name, language) {
    Person.call(this, name);
    this.language = language;
}
Programmer.prototype = Object.create(Person.prototype);
Programmer.prototype.code = function () {
    return Programmer.codes(this.getName(), this.language);
};

Programmer.codes = function (name, language) {
    return `${name} codes in ${language}`;
}

const programmer = new Programmer('Olli', 'Cobol');

const programmers = [programmer, new Programmer('Granny', 'Haskell')];

for (let p of programmers) {
    console.log(p.code());
}

programmers.forEach((p) => console.log(p.code()));

console.log(typeof p);