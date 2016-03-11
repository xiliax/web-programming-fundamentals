// since everything is an Object, so too is a function
function foo() {
    var local = 5
    this.readLocal = local
    this.setLocal = function (v) {
        local = v
    }
    this.getLocal = function () {
        return local
    }
}

console.log("===============================")
console.log(foo);
foo() // no output, not to do
var f = new foo() // creates a Function Object
console.log(f);
console.log(f.readLocal);
console.log(f.getLocal());
f.myName = 'Verrol'
console.log(f);

var f2 = new foo()
console.log(f2);

/* === Output ====
[Function: foo]
{ readLocal: 5, setLocal: [Function], getLocal: [Function] }
5
5
{ readLocal: 5,
  setLocal: [Function],
  getLocal: [Function],
  myName: 'Verrol' }
{ readLocal: 5, setLocal: [Function], getLocal: [Function] }
*/
