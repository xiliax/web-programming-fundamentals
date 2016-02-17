// day 1 temperatures : index 0 => 8am, 1 => 12pm, 2 => 6pm
var day1 = [76, 81, 79]

console.log("temperature readings for day-1: ", day1)

var day1_11amTemp = 80
var day1_2pmTemp = 83

console.log("remove 12pm temp, and replace with 11am and 2pm temps of " + day1_11amTemp + " and " + day1_2pmTemp)

day1.splice(1, 1, day1_11amTemp, day1_2pmTemp)
console.log("temperature readings for day-1: ", day1)


/*
 * Output:
 *------------------

temperature readings for day-1:  [ 76, 81, 79 ]
remove 12pm temp, and replace with 11am and 2pm temps of 80 and 83
temperature readings for day-1:  [ 76, 80, 83, 79 ]

*/
