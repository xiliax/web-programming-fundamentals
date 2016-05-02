function foo() {
    var x = 5

    function goo() {
        console.log('x =', x)
    }

    return goo
}

var g = foo()
g()

/* === Output ====

x = 5

*/
