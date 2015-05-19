# ECMAScript 2015 on io.js 

## Introduction
ECMAScript 2015, also known as ECMAScript 6 or ES6 for short, is the upcoming version of the ECMAScript standard. 
[io.js already supports](http://kangax.github.io/compat-table/es6/#iojs) a significant number of features of this 
standard natively, that is without any kind of transpiling.

Inspired by stile and content of this really nice 
[overview of ES6 features by Luke Hoban](https://github.com/lukehoban/es6features) you can find an overview what is
supported in io.js already and what is not supported, yet. I have copied and adapted what is actually supported in io.js 
from that source.

io.is supports the following new features:
- [arrows](#arrows)
- [classes](#classes)
- [enhanced object literals](#enhanced-object-literals)
- [template strings](#template-strings)
- [destructuring](#destructuring)
- [let + const](#let--const)
- [iterators + for..of](#iterators--forof)
- [generators](#generators)
- [unicode](#unicode)
- [map + set + weakmap + weakset](#map--set--weakmap--weakset)
- [symbols](#symbols)
- [subclassable built-ins](#subclassable-built-ins)
- [promises](#promises)
- [math + number + string + array + object APIs](#math--number--string--array--object-apis)
- [binary and octal literals](#binary-and-octal-literals)

partially supported features
- [default + rest + spread](#default--rest--spread)


and those are the features io.is does not support, yet:
- [modules](#modules)
- [module loaders](#module-loaders)
- [proxies](#proxies)
- [reflect api](#reflect-api)
- [tail calls](#tail-calls)

### Let + Const
Block-scoped binding constructs.  `let` is the new `var`.  `const` is single-assignment.  Static restrictions prevent use before assignment.


```JavaScript
function f() {
  {
    let x;
    {
      // okay, block scoped name
      const x = "sneaky";
      // error, const
      x = "foo";
    }
    // error, already declared in block
    let x = "inner";
  }
}
```

### Iterators + For..Of
Iterator objects enable custom iteration like CLR IEnumerable or Java Iterable.  Generalize `for..in` to custom iterator-based iteration with `for..of`.  Don’t require realizing an array, enabling lazy design patterns like LINQ.

```JavaScript
let fibonacci = {
  [Symbol.iterator]() {
    let pre = 0, cur = 1;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { done: false, value: cur }
      }
    }
  }
}

for (var n of fibonacci) {
  // truncate the sequence at 1000
  if (n > 1000)
    break;
  console.log(n);
}
```

