var day1 = [76, 81, 79]
var day2 = [79, 83, 80]
var day3 = [80, 85, 80]
var day4 = [81, 87, 79]
var day5 = [72, 79, 75]
var day6 = [75, 79, 72]
var day7 = [81, 88, 77]

var week1 = [day1, day2, day4, day6, day7]

// print average temperature by day

function calTempSum(prevVal, currentTemp) {
    return prevVal + currentTemp
}

week1.forEach(function (dailyTemps, index) {
    var sumOfTemp = dailyTemps.reduce(calTempSum)

    var avgTemp = sumOfTemp / dailyTemps.length

    console.log("Average temperature for day-" + (index + 1) + " was " + avgTemp + " deg")
})


/*
 * Output:
 *------------------

Average temperature for day-1 was 78.66666666666667 deg
Average temperature for day-2 was 80.66666666666667 deg
Average temperature for day-3 was 82.33333333333333 deg
Average temperature for day-4 was 75.33333333333333 deg
Average temperature for day-5 was 82 deg

*/
