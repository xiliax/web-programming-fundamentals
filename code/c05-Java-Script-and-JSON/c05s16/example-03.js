/* This program prints a message if the LAST digit of the seconds is 2, 5, or 9.

 * Get the current time.
 */
var now = new Date()

// get the time in the format HH:MM:SS
// Doing this way we always know how many characters we are working with.
// Additionally, getting the time as string, allows us to use it as an array.
// String behave like an array of characters
var time = now.toLocaleTimeString()

// We are only interested in the last digit, so that will be time[7]
var lastDigit = time[7]
if (lastDigit == 2) {
    console.log("The last digit in seconds for the time,", now.toLocaleTimeString(), "is 2")
} else if (lastDigit == 5) {
    console.log("The last digit in seconds for the time,", now.toLocaleTimeString(), "is 5")
} else if (lastDigit == 9) {
    console.log("The last digit in seconds for the time,", now.toLocaleTimeString(), "is 9")
}


/* === Output ====

another@vee ~/X/Y/l/l/c/c/c05s16:master> node example-03
another@vee ~/X/Y/l/l/c/c/c05s16:master> node example-03
The last digit in seconds for the time, 10:47:22 is 2
another@vee ~/X/Y/l/l/c/c/c05s16:master> node example-03
another@vee ~/X/Y/l/l/c/c/c05s16:master> node example-03
The last digit in seconds for the time, 10:47:25 is 5
another@vee ~/X/Y/l/l/c/c/c05s16:master> node example-03
another@vee ~/X/Y/l/l/c/c/c05s16:master> node example-03
another@vee ~/X/Y/l/l/c/c/c05s16:master> node example-03
The last digit in seconds for the time, 10:47:29 is 9
another@vee ~/X/Y/l/l/c/c/c05s16:master> node example-03
another@vee ~/X/Y/l/l/c/c/c05s16:master> node example-03
The last digit in seconds for the time, 10:47:32 is 2

*/
