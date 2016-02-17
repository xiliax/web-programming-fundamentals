// day 1 temperatures : index 0 => 8am, 1 => 12pm, 2 => 6pm
var day1 = [76, 81, 79]

console.log("temperature readings for day-1: ", day1)

console.log("remove 6pm temperature")
var day1EveningTemp = day1.pop()
console.log("temperature readings for day-1: ", day1)
console.log("evening temperature: ", day1EveningTemp)

console.log("remove 8am temperature")
var day1MorningTemp = day1.shift()
console.log("temperature readings for day-1: ", day1)
console.log("morning temperature: ", day1MorningTemp)

console.log("add evening temperature to end of array")
day1.push(day1EveningTemp)
console.log("temperature readings for day-1: ", day1)

console.log("add morning temperature to front of array")
day1.unshift(day1MorningTemp)
console.log("temperature readings for day-1: ", day1)

/*
 * Output:
 *------------------

temperature readings for day-1:  [ 76, 81, 79 ]
remove 6pm temperature
temperature readings for day-1:  [ 76, 81 ]
evening temperature:  79
remove 8am temperature
temperature readings for day-1:  [ 81 ]
morning temperature:  76
add evening temperature to end of array
temperature readings for day-1:  [ 81, 79 ]
add morning temperature to front of array
temperature readings for day-1:  [ 76, 81, 79 ]

*/
