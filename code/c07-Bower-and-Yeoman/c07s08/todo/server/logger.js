/* 
 * logger module provides some simple logging functions
 */
module.exports = {
    info: logInfo,
    warn: logWarn,
    error: logError
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