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
    return this.getName() + " codes in " + this.language;
};

var programmer = new Programmer('Olli', 'Cobol');

var programmers = [programmer, new Programmer('Granny', 'Haskell')];

for (var i in programmers) {
    (function () {
        var p = programmers[i];
        console.log(p.code());
    })();
}

console.log(typeof p);