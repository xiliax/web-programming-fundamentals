var day1 = [76, 81, 79]

// index 0 is 8am temperature, 1 is 12pm, and 2 is 6pm

function printDailyTemp(temp, index) {
    var measurementTimes = ["8am", "12pm", "6pm"]
    var tempTime = measurementTimes[index]

    console.log("It was " + temp + " at " + tempTime)
}

day1.forEach(printDailyTemp)


/*
 * Output:
 *------------------

It was 76 at 8am
It was 81 at 12pm
It was 79 at 6pm

*/
