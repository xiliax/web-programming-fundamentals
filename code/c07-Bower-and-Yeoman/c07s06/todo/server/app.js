/* 
  A simple NodeJS API server for ToDo application:
  1. Accepts POST to /api/v1/login
  2. Accepts POST to /api/v1/user to create a user
  3. Accpets GET to /api/v1/user to read all users (should ONLY be called by Admin users)
  4. Accepts PUT to /api/v1/user/{id} to update user with id 'id' 
*/

const userDb = require("./user-db.js")
const auth = require("./auth-service.js")(userDb)
const user = require("./user-service.js")(userDb)

const taskDb = require("./task-db.js")
const task = require("./task-service.js")(taskDb)

const log = require("./logger.js")

const http = require('http');

const HOSTNAME = '127.0.0.1';
const PORT = 3000;

const SUPPORTED_VERSION = 'v1'

// Configure server for handling connections
const server = http.createServer((req, res) => {
  var path = req.url
  var method = req.method

  if (!path.includes(SUPPORTED_VERSION)) {
    log.error("main", "Unsupported version in " + path)
    res.statusCode = 500 // internal server error
    res.end("Unsuported version")
    return
  }

  /*
    due to CSR (Cross-Site-Request) and CORS (Cross-Origin-Resource-Sharinging), 
    we neeed to handle the OPTIONS method which will tell the browser which 
    mothods are safe to call.
    #### NOTE: ####
    No harm if we send these headers when the request wasn't preceeded by an OPTIONS request
  */
  // Set CORS headers
  if (req.headers.origin) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  }
  if (req.headers['access-control-request-method']) {
    res.setHeader('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
  }
  if (req.headers['access-control-request-headers']) {
    res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
  }

  if ('OPTIONS' == method) {
    res.writeHead(200);
    res.end();
    return;
  }

  if (path.includes(auth.getEndPoint())) {
    auth.handleEndpoint(req, res)
    return
  }

  if (path.includes(user.getEndPoint())) {
    user.handleEndpoint(req, res)
    return
  }

  if (path.includes(task.getEndPoint())) {
    task.handleEndpoint(req, res)
    return
  }

  log.error("main", "Unexpected requested path: " + path)
  res.statusCode = 404 // not found
  res.end("not found")
});

// start listening and server connections
server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});