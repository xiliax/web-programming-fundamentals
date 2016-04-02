/**
 * This program prints the value of the 'count'
 * variable for each iteration of the loop
 */

// initialize loop variable
var MAX_MESSAGES = 5

for (var count = 0; count < MAX_MESSAGES; count = count + 1) {
    console.log("count = ", count)
    count = count + 1 // count++
}

/* === Output ====

count =  0
count =  2
count =  4

*/
