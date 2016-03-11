var ar = new Array()
var ar2 = []

console.log("ar: ", ar, " and length: ", ar.length);
console.log("===============================")
console.log("ar2: ", ar2, " and length: ", ar2.length);

// add some properties to Array object 'ar'
ar.something = 'a value'
ar.other = 25
ar["something cool"] = 5

console.log("===============================")
console.log("After adding some properties to ar")
console.log("ar: ", ar, " and length: ", ar.length);

// now add some elements to 'ar', NOTE the use of integer index
ar[0] = {
    type: 'Animal'
}

console.log("===============================")
    // we can change the length of the array by just changing it length property
ar.length = 4

console.log("ar: ", ar, " and length: ", ar.length)

/* === Output ====
ar:  []  and length:  0
===============================
ar2:  []  and length:  0
===============================
After adding some properties to ar
ar:  [ something: 'a value', other: 25, 'something cool': 5 ]  and length:  0
===============================
ar:  [ { type: 'Animal' },
  ,
  ,
  ,
  something: 'a value',
  other: 25,
  'something cool': 5 ]  and length:  4

*/
