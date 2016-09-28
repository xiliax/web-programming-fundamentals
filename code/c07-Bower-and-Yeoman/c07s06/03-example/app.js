/**
 * Sample NodeJS app that demonstrates how to use 'require'.
 */
const MODULE = "main"
const math = require("./my_math.js")
const log = require("./my_logger.js")
const AModule = require("./a_module.js")

// awesome application
console.log("Value of PI:", math.PI)
console.log("Square of PI:", math.squareIt(math.PI))
log.info(MODULE, "Test log message")
log.warn(MODULE, "Test warn message")
log.error(MODULE, "Test error message")

var am = AModule("ABCD")
am.doSomething()