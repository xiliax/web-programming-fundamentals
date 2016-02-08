/*
 * create two variables:
 * - one call 'name' containg a string whose value is a person's name
 * - another variable containing a number, give that any name you wish
 */
var name = 'verrol'
var pi = 3.14

/**
 * says hello to the name provided in 'aName' and print the number in 'aNumber'
 * aName - expects the name of a person as string
 * aNumber - expects a numberic value
 */
function sayHello1(aName, aNumber) {
    console.log("Hello " + aName)
    console.log("The value of 'aNumber' parameter is " + aNumber)
}

/**
 * says hello to the name provided in 'aName' and print the number in 'aNumber'
 * aName - expects the name of a person as string
 * aNumber - expects a numberic value
 */
var sayHello2 = function (aName, aNumber) {
    console.log("Hello " + aName)
    console.log("The value of 'aNumber' parameter is " + aNumber)
}

sayHello1(name, pi)
sayHello2(name, pi)
