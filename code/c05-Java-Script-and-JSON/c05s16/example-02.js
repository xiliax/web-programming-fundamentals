/* This program prints a message saying whether the seconds in the current time is even or odd.

 * Get the current time.
 */
var now = new Date()

// get the seconds and store it
var seconds = now.getSeconds()

// check remainder of dividing by 2, should be 0 or 1
if ((seconds % 2) == 0) {
    console.log("The seconds for the time,", now.toLocaleTimeString(), "was even")
} else {
    console.log("The seconds for the time,", now.toLocaleTimeString(), "was odd")
}


/* === Output ====

The seconds for the time, 10:36:23 was odd
The seconds for the time, 10:36:25 was odd
The seconds for the time, 10:36:26 was even

*/
