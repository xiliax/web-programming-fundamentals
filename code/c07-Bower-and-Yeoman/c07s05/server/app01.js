/* 
  A simple NodeJS API server for ToDo application:
  1. Accepts POST to /api/v1/login
  2. Accepts POST to /api/v1/user to create a user
  3. Accpets GET to /api/v1/user to read all users (should ONLY be called by Admin users)
  4. Accepts PUT to /api/v1/user/{id} to update user with id 'id' 
*/

const http = require('http');

const HOSTNAME = '127.0.0.1';
const PORT = 3000;
const LOGIN_ENDPOINT = "/api/v1/login"
const USER_ENDPOINT = "/api/v1/user"
const TASK_ENDPOINT = "/api/v1/task"
const SUPPORTED_VERSION = 'v1'

// Configure server for handling connections
const server = http.createServer((req, res) => {
  var path = req.url
  var method = req.method

  if (!path.includes(SUPPORTED_VERSION)) {
    console.log("ERROR - Unsupported version in " + path)
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

  if (path.includes(LOGIN_ENDPOINT)) {
    handleLoginEndpoint(req, res)
    return
  }

  if (path.includes(USER_ENDPOINT)) {
    handleUserEndpoint(req, res)
    return
  }

  if (path.includes(TASK_ENDPOINT)) {
    handleTaskEndpoint(req, res)
    return
  }

  console.log("ERROR - Unexpected requested path: " + path)
  res.statusCode = 404 // not found
  res.end("not found")
});

// start listening and server connections
server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});

// ------------ User endpoint implemenation
var dbUsers = []

// route user request action appropriately
function handleUserEndpoint(req, res) {
  var method = req.method
  var path = req.url
  if ('GET' == method && USER_ENDPOINT == path) {
    console.log("INFO: Calling GET to " + path)
    handleGetAllUsers(req, res)
    return
  }

  if ('POST' == method && USER_ENDPOINT == path) {
    console.log("INFO: Calling POST to " + path)
    handleCreateUser(req, res)
    return
  }

  if ('PUT' == method && path.includes(USER_ENDPOINT)) {
    console.log("INFO: Calling PUT to " + path)
    handleUpdateUser(req, res)
    return
  }

  if ('DELETE' == method && path.includes(USER_ENDPOINT)) {
    console.log("INFO: Calling DELETE to " + path)
    handleDeleteUser(req, res)
    return
  }

  // end request for unsupported methods
  console.log("ERROR - Unsupported method: " + method)
  res.statusCode = 404 // not found
  res.end("not found")
}

/* 
  Method: DELETE
  Endpoint: /api/v1/user/{id}
  
  delete the object with id 'id' if exist in the db. 
  TODO no check for which user id doing the delete etc.
*/
function handleDeleteUser(req, res) {
  var userId = getIdFromPath(req.url)
  var index = getUserIndexById(userId)

  if (-1 == index) {
    console.log("ERROR: No user with id " + userId)
    res.statusCode = 500;
    res.end('No user found. Internal server error')
    return
  }

  dbUsers.splice(index, 1)
  console.log("User with id " + userId + " removed.")
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
function handleUpdateUser(req, res) {
  var userId = getIdFromPath(req.url)
  var body = ''
  var user = findUserById(userId)

  if (!user) {
    console.log("ERROR: No user with id " + userId)
    res.statusCode = 500;
    res.end('No user found. Internal server error')
    return
  }

  req.on('data', function (chunk) {
    body = body + chunk
  });

  req.on('end', function () {
    var data = JSON.parse(body)

    if (data.username) {
      user.username = data.username;
    }

    if (data.password) {
      user.password = data.password;
    }

    if (data.admin != user.admin) {
      user.admin = data.admin;
    }

    console.log("INFO: Updated users: ", JSON.stringify(user))
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end('{"id": ' + user.id + '}')
  })
}

/* 
  Method: POST
  Endpoint: /api/v1/user
  
  read the POST body, convert from JSON to JS object and store in db. 
  Add an "id" field to each new 
  NOTE: This doesn't handle errors at all
*/
function handleCreateUser(req, res) {
  var body = ''

  req.on('data', function (chunk) {
    body = body + chunk
  });

  req.on('end', function () {
    var user = JSON.parse(body)
      // username and password are required
    if (!user.username || !user.password) {
      res.statusCode = 500;
      res.end('No user found. Internal server error')
      return
    }

    // if the 'admin' field isn't provided, set it to false
    if (null == user.admin) {
      user.admin = false
    }

    user.id = dbUsers.length + 1
    dbUsers.push(user)

    console.log("User with id " + user.id + " added.")
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
function handleGetAllUsers(req, res) {
  var usersToReturn = dbUsers.map(function (user) {
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


/* 
Login endpoint
*/
function handleLoginEndpoint(req, res) {
  var method = req.method

  if ('POST' != method) {
    // end request for unsupported methods
    console.log("ERROR - Unsupported method: " + method + " for endpoint " + req.url)
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
      console.log("ERROR: Invalid login data ")
      res.statusCode = 500;
      res.end('Invalid credential. Internal server error')
      return
    }

    // see if the user exist
    var user = findUserByUsernameAndPasswod(loginInfo.username, loginInfo.password)
    if (!user) {
      console.log("ERROR: No user " + loginInfo.username)
      res.statusCode = 500;
      res.end('No user found. Internal server error')
      return
    }

    // all checks passed, user can login
    var temp = Object.assign({}, user)
    delete temp.password
    var result = JSON.stringify(temp)
    console.log("INFO: User logged in: ", result)
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(result);
  })
}

// ---------- Helper functions
/** using username and password, in the user */
function findUserByUsernameAndPasswod(username, password) {
  if (null == username || null == password) {
    return null
  }

  var user = dbUsers.find(function (el) {
    if (el.username == username && el.password == password) {
      return true
    }

    return false
  });

  return user
}

/**
  returns object if found, null otherwise
*/
function findUserById(userId) {
  var index = getUserIndexById(userId)

  if (index == -1) {
    return null;
  }

  return dbUsers[index]
}

function getUserIndexById(userId) {
  if (!userId || -1 == userId) {
    return -1;
  }

  var index = dbUsers.findIndex(function (el, idx) {
    if (el.id == userId) {
      return true
    }
    return false
  });

  return index;
}


// ------------ Task endpoint implemenation
var dbTasks = []

// route task request action appropriately
function handleTaskEndpoint(req, res) {
  var method = req.method
  var path = req.url
  if ('GET' == method && TASK_ENDPOINT == path) {
    console.log("INFO: Calling GET to " + path)
    handleGetAllTasks(req, res)
    return
  }

  if ('POST' == method && TASK_ENDPOINT == path) {
    console.log("INFO: Calling POST to " + path)
    handleCreateTask(req, res)
    return
  }

  if ('PUT' == method && path.includes(TASK_ENDPOINT)) {
    console.log("INFO: Calling PUT to " + path)
    handleUpdateTask(req, res)
    return
  }

  if ('DELETE' == method && path.includes(TASK_ENDPOINT)) {
    console.log("INFO: Calling DELETE to " + path)
    handleDeleteTask(req, res)
    return
  }

  // end request for unsupported methods
  console.log("ERROR - Unsupported method: " + method)
  res.statusCode = 404 // not found
  res.end("not found")
}

/* 
  Method: DELETE
  Endpoint: /api/v1/task/{id}
  
  delete the object with id 'id' if exist in the db. 
  TODO no check for which task id doing the delete etc.
*/
function handleDeleteTask(req, res) {
  var taskId = getIdFromPath(req.url)
  var index = getTaskIndexById(taskId)

  if (-1 == index) {
    console.log("ERROR: No task with id " + taskId)
    res.statusCode = 500;
    res.end('No task found. Internal server error')
    return
  }

  dbTasks.splice(index, 1)
  console.log("Task with id " + taskId + " removed.")
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
function handleUpdateTask(req, res) {
  var taskId = getIdFromPath(req.url)
  var body = ''
  var task = findTaskById(taskId)

  if (!task) {
    console.log("ERROR: No task with id " + taskId)
    res.statusCode = 500;
    res.end('No task found. Internal server error')
    return
  }

  req.on('data', function (chunk) {
    body = body + chunk
  });

  req.on('end', function () {
    var data = JSON.parse(body)

    if (data.title) {
      task.title = data.title;
    }

    if (data.status) {
      task.status = data.status;
    }

    if (data.description != task.description) {
      task.description = data.description;
    }

    console.log("INFO: Updated tasks: ", JSON.stringify(task))
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end('{"id": ' + task.id + '}')
  })
}

/* 
  Method: POST
  Endpoint: /api/v1/task
  
  read the POST body, convert from JSON to JS object and store in db. 
  Add an "id" field to each new 
  NOTE: This doesn't handle errors at all
*/
function handleCreateTask(req, res) {
  var body = ''

  req.on('data', function (chunk) {
    body = body + chunk
  });

  req.on('end', function () {
    var task = JSON.parse(body)
      // ownerId and title are required
    if (!task.ownerId || !task.title) {
      res.statusCode = 500;
      res.end('Internal server error')
      return
    }

    // if the 'status' field isn't provided, set it to 'Not started'
    if (null == task.status) {
      task.status = 'Not started'
    }

    task.id = dbTasks.length + 1
    dbTasks.push(task)

    console.log("Task with id " + task.id + " added.")
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
function handleGetAllTasks(req, res) {
  var tasksToReturn = dbTasks.map(function (task) {
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

// ---------- Helper functions
/**
  returns object if found, null otherwise
*/
function findTaskById(taskId) {
  var index = getTaskIndexById(taskId)

  if (index == -1) {
    return null;
  }

  return dbTasks[index]
}

function getTaskIndexById(taskId) {
  if (!taskId || -1 == taskId) {
    return -1;
  }

  var index = dbTasks.findIndex(function (el, idx) {
    if (el.id == taskId) {
      return true
    }
    return false
  });

  return index;
}

/* 
expected path is /api/vX/entity/id, thus split on '/' create 5 fields
NOTE: The first fields is empty: ['', 'api', 'vX', 'entity', id]
 */
function getIdFromPath(path) {
  var fields = path.split('/')
  if (5 != fields.length) {
    return -1
  }

  return fields[fields.length - 1]
}