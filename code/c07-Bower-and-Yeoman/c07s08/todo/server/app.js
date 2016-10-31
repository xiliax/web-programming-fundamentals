/* 
  A simple NodeJS API server for ToDo application:
*/

const express = require('express');
var app = express();
// Express application

const userDb = require("./user-db.js")
const auth = require("./auth-service.js")(userDb)
const user = require("./user-service.js")(userDb)

const taskDb = require("./task-db.js")
const task = require("./task-service.js")(taskDb)

const log = require("./logger.js")

const HOSTNAME = '127.0.0.1';
const PORT = 3000;

const SUPPORTED_VERSION = 'v1'
const LOGIN_ENDPOINT = "/api/" + SUPPORTED_VERSION + "/login"
const USER_ENDPOINT = "/api/" + SUPPORTED_VERSION + "/user"
const TASK_ENDPOINT = "/api/" + SUPPORTED_VERSION + "/task"

app.use(handleCors)
app.use(LOGIN_ENDPOINT, auth);
app.use(USER_ENDPOINT, user);
app.use(TASK_ENDPOINT, task);

// start listening for connections
app.listen(PORT, () => {
  console.log("Server running at http://" + HOSTNAME + ":" + PORT + "/");
});

function handleCors(req, res, next){
  /*
    due to CSR (Cross-Site-Request) and CORS (Cross-Origin-Resource-Sharinging), we neeed to handle 
    the OPTIONS method which will tell the browser which mothods are safe to call.
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

  next();
}