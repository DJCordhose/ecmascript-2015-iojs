//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const

'use strict';

// a simple block, not a function
{
    // error: there is no hoisting, you can not use x before definition
    //console.log(x);
    let x = 'outer';
    console.log(x);
    {
        // okay, block scoped name
        const x = 'sneaky';
        // error: you can not re-assign a const variable
        //x = 'foo';
        // error: you can assign a value to a const variable only on initialization
        //const y;
        //y = 10;
    }
    // error: already declared in block
    //let x = 'inner';

}

// error: x is only defined inside block
//console.log(x);
