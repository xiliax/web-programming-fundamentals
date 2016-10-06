/* 
  Task RESTful service implemenation
  1. Accepts POST to /api/v1/task to create a task
  2. Accpets GET to /api/v1/task to read all tasks
  3. Accepts PUT to /api/v1/task/{id} to update task with id 'id' 
  4. Accepts DELETE to /api/v1/task/{id} to delete task with id 'id' 
*/
const utils = require("./utils.js")
const log = require("./logger.js")

const ENDPOINT = "/api/v1/task"

var myTaskDb = {}

module.exports = function (taskDb) {
    myTaskDb = taskDb
    return {
        getEndPoint: getEndPoint,
        handleEndpoint: handleEndpoint
    };
};

// ---------------------------
function getEndPoint() {
    return ENDPOINT;
}

// route task request action appropriately
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
  Endpoint: /api/v1/task/{id}
  
  delete the object with id 'id' if exist in the db. 
  TODO no check for which task id doing the delete etc.
*/
function handleDelete(req, res) {
    var taskId = utils.getIdFromPath(req.url)

    if (!myTaskDb.remove(taskId)) {
        log.error("handleDelete", "No task with id " + taskId)
        res.statusCode = 500;
        res.end('Internal server error')
        return
    }

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end('{"id": ' + taskId + '}')
}

/* 
  Method: PUT
  Endpoint: /api/v1/task/{id}
  
  read the PUT body, convert from JSON to JS object and update in db. 
  NOTE: This doesn't handle errors at all

*/
function handleUpdate(req, res) {
    var taskId = utils.getIdFromPath(req.url)
    var body = ''

    req.on('data', function (chunk) {
        body = body + chunk
    });

    req.on('end', function () {
        var data = JSON.parse(body)

        if (!myTaskDb.update(taskId, data)) {
            log.error("handleUpdate", "Unable to update task with id " + taskId)
            res.statusCode = 500;
            res.end('Internal server error')
            return
        }

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end('{"id": ' + taskId + '}')
    })
}

/* 
  Method: POST
  Endpoint: /api/v1/task
  
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
        var task = JSON.parse(body)

        if (!myTaskDb.add(task)) {
            res.statusCode = 500;
            res.end('Internal server error')
            return
        }

        log.info("handleCreate", "Task with id " + task.id + " added.")
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end('{"id": ' + task.id + '}');
    })
}

/* 
  Method: GET
  Endpoint: /api/v1/task
  
   return the array of tasks, without their password as a JSON string 
   NOTE: Only Admin tasks should call this method
 */
function handleGetAll(req, res) {
    var tasksToReturn = myTaskDb.getAll().map(function (task) {
        var temp = Object.assign({}, task) // clone task
        return temp
    })

    var result = JSON.stringify({
        tasks: tasksToReturn
    })
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(result);
}