var i = 4
console.log("'i' is ", i, " and type of 'i' is ", typeof (i))

console.log("===============================")
    // add a property to the variable 'i'. NOTE no error, but not what you expect
i.tooCool = 'added a property to "i"'
console.log("i.tooCool is ", i.tooCool)

console.log("===============================")
i = new Number(4)
console.log("'i' is ", i, " and type of 'i' is ", typeof (i))
console.log("value of 'i' is ", i.toString())
console.log("===============================")

console.log("is an object/instance of Number numberic? what is i + 5? ", i + 5)

console.log("===============================")
var s = new String('4')
console.log("'s' is ", s, " and type of 's' is ", typeof (s))
console.log("what is new String('4') + 5? ", s + 5)

console.log("===============================")
    // add a property to the variable 'i', since 'i' is an object
i.tooCool = 'added a property to "i"'
console.log("i.tooCool is ", i.tooCool)

/* === Output ====

'i' is  4  and type of 'i' is  number
===============================
i.tooCool is  undefined
===============================
'i' is  {}  and type of 'i' is  object
===============================
i.tooCool is  added a property to "i"

*/
