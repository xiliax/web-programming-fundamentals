/* This program prints a message saying whether the seconds in the current time is even.

 * Get the current time.
 */
var now = new Date()

// get the seconds and store it
var seconds = now.getSeconds()

// check remainder of dividing by 2, should be 0 or 1
if ((seconds % 2) == 0) {
    console.log("The seconds for the time,", now.toLocaleTimeString(), "was even")
}


/* === Output ====

The seconds for the time, 10:29:46 was even
The seconds for the time, 10:30:54 was even

*/
