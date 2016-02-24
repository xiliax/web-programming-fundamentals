/*
 * name, age, date of birth, and favorite foods for a few friends
 * and family members stored in an array of objects
 *
 */

var bob = {
    name: "Bob",
    age: 13,
    dob: new Date(2013, 0, 23), // NOTE: Month value for Date() type is 0-based. Hence 0 => Jan, 1 => Feb, etc.
    ffoods: ["Pizza", "Hamburgers"]
}

var clint = {
    name: "Clint",
    age: 43,
    dob: new Date(1972, 9, 1),
    ffoods: ["Chinese", "Italian", "Mexican"]
}

var uri = {
    name: "Uri",
    age: 57,
    dob: new Date(1958, 7, 12),
    ffoods: ["Pizza", "Hot dogs", "Steaks"]
}

var frank = {
    name: "Frank",
    age: 23,
    dob: new Date(1992, 4, 9),
    ffoods: []
}

var dataSet = [bob, clint, uri, frank]


console.log("Print the names of people in the entire data set")
dataSet.forEach(function (person) {
    console.log(person.name)
})

console.log("===============================")

console.log("Print average age in data set")
var sumOfAges = dataSet.reduce(function (prev, curr) {
    return (prev + curr.age)
}, 0);

console.log("Average age: " + (sumOfAges / dataSet.length))

console.log("===============================")

console.log("Print the names and age of anyone older than 20")
var olderThan20Yeas = dataSet.filter(function (person) {
    return person.age > 20
});

olderThan20Yeas.forEach(function (person) {
    console.log(person.name + " is " + person.age + " years old")
})


/*
 * Output:
 *------------------

Print the names of people in the entire dataSet
Bob
Clint
Uri
Frank
===============================
Print the names and age of anyone older than 20
Clint is 43 years old
Uri is 57 years old
Frank is 23 years old

*/
