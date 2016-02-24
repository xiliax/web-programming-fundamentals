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


console.log("Bob's data: ", bob)

console.log("===============================")

console.log("Entire dataSet: ", dataSet)

/*
 * Output:
 *------------------

Bob's data:  { name: 'Bob',
  age: 13,
  dob: Wed Jan 23 2013 00:00:00 GMT-0500 (EST),
  ffoods: [ 'Pizza', 'Hamburgers' ] }
===============================
Entire dataSet:  [ { name: 'Bob',
    age: 13,
    dob: Wed Jan 23 2013 00:00:00 GMT-0500 (EST),
    ffoods: [ 'Pizza', 'Hamburgers' ] },
  { name: 'Clint',
    age: 43,
    dob: Sun Oct 01 1972 00:00:00 GMT-0400 (EDT),
    ffoods: [ 'Chinese', 'Italian', 'Mexican' ] },
  { name: 'Uri',
    age: 57,
    dob: Tue Aug 12 1958 00:00:00 GMT-0400 (EDT),
    ffoods: [ 'Pizza', 'Hot dogs', 'Steaks' ] },
  { name: 'Frank',
    age: 23,
    dob: Sat May 09 1992 00:00:00 GMT-0400 (EDT),
    ffoods: [] } ]

*/
