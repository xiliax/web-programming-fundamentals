var x = 'global'

function foo() {
    var x = 'x in foo'
    console.log('x:', x)

    function goo() {
        var x = 'x in goo'
        console.log('x:', x)
    }
    goo()
    console.log('x:', x)
}

console.log('x:', x)
foo()
console.log('x:', x)

/* === Output ====

x: global
x: x in ---
x: x in ---
x: x in ---
x: global

*/
