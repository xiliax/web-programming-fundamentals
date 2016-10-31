// ------------ Authentication service implemenation
var express = require('express');
var router = express.Router();
const log = require("./logger.js")

var myUserDb = {}

module.exports = function (userDb) {
    myUserDb = userDb
    return router;
};

/* 
  read the POST body, convert from JSON to JS object and check against db. 
  Required object: {"username":<string>, "password":<string>}
*/
router.post('/', function(req, res){
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
        res.send(result);
    })
});