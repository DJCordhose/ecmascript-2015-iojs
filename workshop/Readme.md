# Workshop: ECMAScript 2015 on io.js

# Prerequisites for students

* Installation: Have this repo and the latest version of io.js 2.x installed
* Have any form of editor or IDE to write JavaScript
* Knowledge of ES5

# Assignment

programmer-step0.js written in ES5, convert it to ES6

# Format

Instructor explains a new ES6 concept, supported by io.js and students apply it to example.
By doing so they incrementally transform the ES5 example into ES6.

## Step 0

Explain ES5 and its pain points

## Step 1: Basic stuff

* replace all variables to ES6 block scope versions (let, const)
* replace loop with for...of
* String interpolation (`${name} codes in ${language}`)

## Step 2: Advanced

* => (syntax does work, but no automatic binding to this) (in .forEach)
* class, extends, static: replace ES5 boiler plate by this syntactic sugar
* Set, Map: replace array with Set

## Step 3: There is more

* Iterable, Symbol, Generator: iterator for programmers using generators?
* Promises?

# Schedule

Workshop takes approx. 45 minutes

* Set Up (10 minutes): Install io.js 2.0 and clone this repo, execute first script using io.js
* Step-0 (5 minutes)
* Step-1 (max. 15 minutes)
* Step-2 (max. 15 minutes)
* Step-3 (whatever time is left)

# Links
* https://iojs.org/en/es6.html
* http://kangax.github.io/compat-table/es6/
