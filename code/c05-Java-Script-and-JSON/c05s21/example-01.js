var x = 'global'

function foo() {
    x = 'x in foo'
    console.log('x:', x)
}

console.log('x:', x)
foo()
console.log('x:', x)
