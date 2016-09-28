var storedValue = ""

function init(param) {
    console.log("Awesome initializtion for Module-A using", param)
    storedValue = param
}

module.exports = function (param) {
    init(param)
    return {
        doSomething: function () {
            console.log("doSomething() called: Using '" + storedValue + "'")
        }
    }
}