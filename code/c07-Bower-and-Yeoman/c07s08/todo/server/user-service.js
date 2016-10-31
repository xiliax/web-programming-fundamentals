var express = require('express');
var router = express.Router();
const log = require("./logger.js")

var myUserDb = {}

module.exports = function (userDb) {
    myUserDb = userDb
    return router;
};

/* 
  delete the object with id 'id' if exist in the db. 
  TODO no check for which user id doing the delete etc.
*/
router.delete("/:id", function(req, res) {
    var userId = req.params.id

    if (!myUserDb.remove(userId)) {
        log.error("handleDelete", "No user with id " + userId)
        res.statusCode = 500;
        res.end('Internal server error')
        return
    }

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end('{"id": ' + userId + '}')
});

/* 
  read the PUT body, convert from JSON to JS object and update in db. 
  NOTE: This doesn't handle errors at all

*/
router.put("/:id", function(req, res) {
    var userId = req.params.id
    var body = ''

    req.on('data', function (chunk) {
        body = body + chunk
    });

    req.on('end', function () {
        var data = JSON.parse(body)

        if (!myUserDb.update(userId, data)) {
            log.error("handleUpdate", "Unable to update user with id " + userId)
            res.statusCode = 500;
            res.end('Internal server error')
            return
        }

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end('{"id": ' + userId + '}')
    })
});

/* 
  read the POST body, convert from JSON to JS object and store in db. 
  Add an "id" field to each new 
  NOTE: This doesn't handle errors at all
*/
router.post("/", function(req, res) {
    var body = ''

    req.on('data', function (chunk) {
        body = body + chunk
    });

    req.on('end', function () {
        var user = JSON.parse(body)

        if (!myUserDb.add(user)) {
            res.statusCode = 500;
            res.end('Internal server error')
            return
        }

        log.info("handleCreate", "User with id " + user.id + " added.")
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end('{"id": ' + user.id + '}');
    })
});

/* 
   return the array of users, without their password as a JSON string 
   NOTE: Only Admin users should call this method
 */
router.get("/", function(req, res) {
    var usersToReturn = myUserDb.getAll().map(function (user) {
        var temp = Object.assign({}, user) // clone user
        delete temp.password // remove password from cloned object
        return temp
    })

    var result = JSON.stringify({
        users: usersToReturn
    })
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(result);
});