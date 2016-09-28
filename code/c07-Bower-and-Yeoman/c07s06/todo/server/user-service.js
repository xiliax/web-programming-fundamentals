/* 
  User RESTful service implemenation
  1. Accepts POST to /api/v1/user to create a user
  2. Accpets GET to /api/v1/user to read all users (should ONLY be called by Admin users)
  3. Accepts PUT to /api/v1/user/{id} to update user with id 'id' 
  4. Accepts DELETE to /api/v1/user/{id} to delete user with id 'id' 
*/
const utils = require("./utils.js")
const log = require("./logger.js")

const ENDPOINT = "/api/v1/user"

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
    return ENDPOINT;
}


// route user request action appropriately
function handleEndpoint(req, res) {
    var method = req.method
    var path = req.url
    if ('GET' == method && ENDPOINT == path) {
        log.info("handleEndpoint", "Calling GET to " + path)
        handleGetAll(req, res)
        return
    }

    if ('POST' == method && ENDPOINT == path) {
        log.info("handleEndpoint", "Calling POST to " + path)
        handleCreate(req, res)
        return
    }

    if ('PUT' == method && path.includes(ENDPOINT)) {
        log.info("handleEndpoint", "Calling PUT to " + path)
        handleUpdate(req, res)
        return
    }

    if ('DELETE' == method && path.includes(ENDPOINT)) {
        log.info("handleEndpoint", "Calling DELETE to " + path)
        handleDelete(req, res)
        return
    }

    // end request for unsupported methods
    log.error("handleEndPoint", "Unsupported method: " + method)
    res.statusCode = 404 // not found
    res.end("not found")
}

/* 
  Method: DELETE
  Endpoint: /api/v1/user/{id}
  
  delete the object with id 'id' if exist in the db. 
  TODO no check for which user id doing the delete etc.
*/
function handleDelete(req, res) {
    var userId = utils.getIdFromPath(req.url)

    if (!myUserDb.remove(userId)) {
        log.error("handleDelete", "No user with id " + userId)
        res.statusCode = 500;
        res.end('Internal server error')
        return
    }

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end('{"id": ' + userId + '}')
}

/* 
  Method: PUT
  Endpoint: /api/v1/user/{id}
  
  read the PUT body, convert from JSON to JS object and update in db. 
  NOTE: This doesn't handle errors at all

*/
function handleUpdate(req, res) {
    var userId = utils.getIdFromPath(req.url)
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
}

/* 
  Method: POST
  Endpoint: /api/v1/user
  
  read the POST body, convert from JSON to JS object and store in db. 
  Add an "id" field to each new 
  NOTE: This doesn't handle errors at all
*/
function handleCreate(req, res) {
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
}

/* 
  Method: GET
  Endpoint: /api/v1/user
  
   return the array of users, without their password as a JSON string 
   NOTE: Only Admin users should call this method
 */
function handleGetAll(req, res) {
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
}