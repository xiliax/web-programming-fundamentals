/**
 * this demonstrates that 'Function' as a value/data type, is a first-class citizen * in the language. Meaning, you can pass functions values around and assign them
 * just like any other value. That includes passing a function value to another
 * function too.
 */


function foo() {
    console.log("I am function foo()")
}

function goo(a) {
    console.log("I am function goo(a), and was called with a = " + a)
}

/**
 * let's use function hoo(), to call both function foo() and goo(a). But we will
 * pass in the functions foo() and goo() as parameters/arguments to hoo().
 *
 * of course we have to define what hoo() looks like before we can use it.
 */
function hoo(funFoo, funGoo, paramAForFunGoo) {
    // call foo() using variable funFoo
    funFoo()

    // call goo() using variables funGoo and the paramAForFunGoo
    funGoo(paramAForFunGoo)
}

// now that we have defined how function 'hoo' works, let's use it.
hoo(foo, goo, 3.14)

/**
 * Output:

I am function foo()
I am function goo(a), and was called with a = 3.14

*/
