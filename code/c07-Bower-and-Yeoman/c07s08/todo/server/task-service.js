var express = require('express');
var router = express.Router();
const log = require("./logger.js")

var myTaskDb = {}

module.exports = function (taskDb) {
    myTaskDb = taskDb
    return router;
};

/* 
  delete the object with id 'id' if exist in the db. 
  TODO no check for which task id doing the delete etc.
*/
router.delete("/:id", function(req, res) {
    var taskId = req.params.id;

    if (!myTaskDb.remove(taskId)) {
        log.error("handleDelete", "No task with id " + taskId)
        res.statusCode = 500;
        res.end('Internal server error')
        return
    }

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end('{"id": ' + taskId + '}')
});

/* 
  read the PUT body, convert from JSON to JS object and update in db. 
  NOTE: This doesn't handle errors at all
*/
router.put("/:id", function(req, res) {
    var taskId = req.params.id;
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
});

/* 
   return the array of tasks, without their password as a JSON string 
   NOTE: Only Admin tasks should call this method
 */
router.get("/", function(req, res) {
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
});