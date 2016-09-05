/* 
  A simple NodeJS API server which does the following:
  1. Accepts POST request to the API endpoint /api/tasks
     - JSON object is: {"title":<string>, "ownerId":<number>, "status":<string>}
       NOTE: 'stauts' is OPTIONAL
  2. Accept GET reqeust to the API endpoint /api/tasks
     - Returns an array of tasks created with POST request
       NOTE: JSON object is: 
          {"id":<number>, "title":<string>, "ownerId":<number>, "status":<string>}
 */

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
const api_tasks = "/api/tasks"

// Configure server for handling connections
const server = http.createServer((req, res) => {
  var method = req.method
  var path = req.url

  // if request path is NOT supported, return error
  if(api_tasks != path){
    console.log("ERROR - Unexpected requested path: " + path)

    res.statusCode = 404  // not found
    res.end("not found")
    return
  }

  if('GET' == method){
    handleGetTasks(req, res)
    return
  }
  
  if('POST' == method){
    handlePostTasks(req, res)
    return
  }

  // end request for unsupported methods
    console.log("ERROR - Unsupported method: " + method)

    res.statusCode = 404  // not found
    res.end("not found")
});

// start listening and server connections
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// ------------
var dbTasks = []

/* return the array of tasks as a JSON string */
function handleGetTasks(req, res){
  var result = JSON.stringify(dbTasks)

  console.log(dbTasks.length + " items returned")

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(result);
}

/* read the POST body, convert from JSON to JS object and store in db. Add an "id" field 
   to each new task NOTE: This doesn't handle errors at all
*/
function handlePostTasks(req, res){
    var body = ''

    req.on('data', function(chunk){
      body = body + chunk
    });

    req.on('end', function(){
      var item = JSON.parse(body)
      item.id = dbTasks.length + 1
      dbTasks.push(item)
      console.log("Item with id " + item.id + " added.")


      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end('{"id": ' + item.id + '}');
    })
}