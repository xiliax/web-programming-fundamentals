// ------------ Authentication service implemenation
const log = require("./logger.js")

const LOGIN_ENDPOINT = "/api/v1/login"

var myUserDb = {}

module.exports = function (userDb) {
    myUserDb = userDb
    return {
        getEndPoint: getEndPoint,
        handleEndpoint: handleEndpoint
    };
};

// ---------------------------
function getEndPoint() {
    return LOGIN_ENDPOINT;
}

/* 
Login endpoint
*/
function handleEndpoint(req, res) {
    var method = req.method

    if ('POST' != method) {
        // end request for unsupported methods
        log.error("handleEndpoint", "Unsupported method: " + method + " for endpoint " + req.url)
        res.statusCode = 500 // internal server error
        res.end("internal server error ")
        return
    }

    handleLogin(req, res)
}

/* 
  Method: POST
  Endpoint: /api/v1/login
  
  read the POST body, convert from JSON to JS object and check against db. 
  Required object: {"username":<string>, "password":<string>}
*/
function handleLogin(req, res) {
    var body = ''

    req.on('data', function (chunk) {
        body = body + chunk
    });

    req.on('end', function () {
        var loginInfo = JSON.parse(body)

        // validate that all required fields are provided
        if (!loginInfo || null == loginInfo.username || null == loginInfo.password) {
            log.error("handleLogin", "Invalid login data")
            res.statusCode = 500;
            res.end('Invalid credential. Internal server error')
            return
        }

        // see if the user exist
        var user = myUserDb.findByUsernameAndPasswod(loginInfo.username, loginInfo.password)
        if (!user) {
            log.error("handleLogin", "No user " + loginInfo.username)
            res.statusCode = 500;
            res.end('No user found. Internal server error')
            return
        }

        // all checks passed, user can login
        var temp = Object.assign({}, user)
        delete temp.password
        var result = JSON.stringify(temp)
        log.info("handleLogin", "User logged in: " + result)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(result);
    })
}