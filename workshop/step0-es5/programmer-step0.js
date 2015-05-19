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
    return name + " codes in " + language;
}

var programmer = new Programmer('Olli', 'Cobol');

var programmers = [programmer, new Programmer('Granny', 'Haskell')];

(function () {
    for (var i in programmers) {
        var p = programmers[i];
        console.log(p.code());
    }
})();

// or

programmers.forEach(function(p) {
    console.log(p.code());
});

console.log(typeof p);