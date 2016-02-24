var day1 = [76, 81, 79]
var day2 = [79, 83, 80]
var day3 = [80, 85, 80]
var day4 = [81, 87, 79]
var day5 = [72, 79, 75]
var day6 = [75, 79, 72]
var day7 = [81, 88, 77]

var week1 = [day1, day2, day4, day6, day7]

// print daily temperatures:

function printDailyTemp(dailyTemps, index) {
    console.log("Temperature for day-" + (index + 1) + " was ", dailyTemps)
}

week1.forEach(printDailyTemp);


/*
 * Output:
 *------------------

Temperature for day-1 was  [ 76, 81, 79 ]
Temperature for day-2 was  [ 79, 83, 80 ]
Temperature for day-3 was  [ 81, 87, 79 ]
Temperature for day-4 was  [ 75, 79, 72 ]
Temperature for day-5 was  [ 81, 88, 77 ]

*/
