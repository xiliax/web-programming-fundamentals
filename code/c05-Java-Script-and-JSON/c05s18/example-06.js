/**
 * This program prints the value of the 'count'
 * variable for each iteration of the loop
 */

// initialize loop variable
var MAX_MESSAGES = 5
var count = 0

for (; count < MAX_MESSAGES;) {
    console.log("count = ", count)
    count = count + 1 // count++
}

/* === Output ====

count =  0
count =  1
count =  2
count =  3
count =  4

*/
