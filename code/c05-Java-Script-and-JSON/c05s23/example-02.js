function foo(name) {
    var x = 5

    function goo() {
        console.log('name:', name, ', x =', x)
        x = 7
    }

    return goo
}

var bar = 'bar'
var g = foo(bar)
g()

var tar = 'tar'
var f = foo(tar)
f()

/* === Output ====

name: bar , x = 5
name: tar , x = 5

*/
