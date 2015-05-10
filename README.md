# ecmascript-2015-iojs
Sandbox for ECMAScript 2015 features available in io.js 2.x

# Workshop

# Prerequisites of students

* Installation: Have this repo and the latest version of io.js 2.x installed
* Have any form of editor or IDE to write JavaScript
* Knowledge of ES5

# Assignment

start.js written in ES5, convert it to ES6

# Format

Instructor explains a new ES6 concept, support by io.js and students apply it to start.js.
By doing so they incrementally transform the ES5 example into ES6

## Step 0

Explain ES5 and its pain points

## Step 1: Basic stuff

* replace all variables to ES6 block scope versions (let, const)
* replace loop with for...of
* => (syntax does work, but no automatic binding to this) (in .forEach)
* String interpolation (`${name} codes in ${language}`)

## Step 2: Advanced

* class, extends, static
* Set, Map, Iterable, Symbol

## Step X

Quickly show all the features that we have not talked about, yet, but are still supported

* Promises
* Generators
* proxies

# Schedule

Workshop takes approx. 45 minutes

* Set Up (10 minutes): Install io.js 2.0 and clone this repo, execute first script using io.js
* Step-0 (5 minutes)
* Step-1 (15 minutes)
* Step-2 (15 minutes)
* Step-X (whatever time is left)

# Links
* https://iojs.org/en/es6.html
* http://kangax.github.io/compat-table/es6/

# What is supported
* class, extends, static
* let/const
* for..of
* String interpolation (`${name} codes in ${language}`)
* Promises
* Generators
* Set, Map, Iterable, Symbol
* => (syntax does work, but no automatic binding to this)

# Applications?

Where can this be beneficial within the node libraries?

