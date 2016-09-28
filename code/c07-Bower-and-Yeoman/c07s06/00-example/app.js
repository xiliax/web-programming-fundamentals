/**
 * Sample NodeJS app that demonstrates how to use 'require'.
 */
const MODULE = "main"
const PI = 3.14159

// awesome application
console.log("Value of PI:", PI)
console.log("Square of PI:", squareIt(PI))
logInfo(MODULE, "Test log message")
logWarn(MODULE, "Test warn message")
logError(MODULE, "Test error message")

function squareIt(x) {
    return (x * x)
}

function logInfo(module, message) {
    console.log("%s INFO %s %s", getLogTime(), module, message)
}

function logWarn(module, message) {
    console.log("%s WARN %s %s", getLogTime(), module, message)
}

function logError(module, message) {
    console.log("%s ERROR %s %s", getLogTime(), module, message)
}

function getLogTime() {
    var now = new Date()
    return now.toISOString()
}