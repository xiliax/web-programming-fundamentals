var app = angular.module("ToDoApp")


app.service('TaskDbService', function (UserDbService, $http) {
  var TASK_ENDPOINT = "http://localhost:3000/api/v1/task"

  var tasks = [];


  /** make a new ToDo object and return it */
  function initTask() {
    return {
      title: '',
      status: 'Not Started',
      description: ''
    };
  }

  /**
    get a copy of all Tasks if admin user, else just tasks for the current user
   */
  function getAllTasks(callback) {
    // load stored tasks from remote server
    $http.get(TASK_ENDPOINT).success(function (resp) {
      tasks = resp.tasks;

      if (UserDbService.isAdmin()) {
        callback(angular.copy(tasks))
        return
      }

      var user = UserDbService.getCurrentUser()

      var userTasks = tasks.filter(function (el) {
        if (el.ownerId == user.id) {
          return true
        }
        return false
      });

      callback(angular.copy(userTasks))
    }).error(function (resp, status) {
      console.log("ERROR: Saving error: resp: ", resp, ", status: ", status)
      tasks = []
      callback(angular.copy(tasks))
    });
  }

  /**
    return true if object added, false otherwise
   */
  function addTask(task, callback) {
    if (task) {
      var user = UserDbService.getCurrentUser()
      task.ownerId = user.id;

      $http.post(TASK_ENDPOINT, task).success(function (resp) {
        callback(true)
      }).error(function (resp, status) {
        console.log("ERROR: Saving error: resp: ", resp, ", status: ", status)
        callback(false)
      });
    }
  }

  /**
    returns object if found, null otherwise
   */
  function getTaskById(taskId) {
    var index = getTaskIndexById(taskId)

    if (index == -1) {
      return null;
    }

    return angular.copy(tasks[index])
  }

  /**
    pass true to callback if task deleted, or false
   */
  function removeTask(taskId, deleteOk) {
    var index = getTaskIndexById(taskId)

    if (index == -1) {
      deleteOk(false);
    }

    var task = tasks[index];
    // ensure task cannot be remove anyoneelse other than the owner or an admin user
    var currentUser = UserDbService.getCurrentUser();
    if (!UserDbService.isAdmin() && (task.ownerId != currentUser.id)) {
      deleteOk(false);
    }

    // remove object with task.id, since reference might have changed
    $http.delete(TASK_ENDPOINT + "/" + taskId).success(function (resp) {
      deleteOk(true)
    })
  }

  /**
    returns true if object was updated, false otherwise
   */
  function updateTask(taskId, data, updateOk) {
    if (!data) {
      updateOk(false)
    }

    var index = getTaskIndexById(taskId)

    if (index == -1) {
      updateOk(false)
    }

    var task = tasks[index];

    // ensure task is updated by ONLY the owner or an admin user
    var currentUser = UserDbService.getCurrentUser();
    if (!UserDbService.isAdmin() && (task.ownerId != currentUser.id)) {
      updateOk(false)
    }

    console.log("DEBUG: " + TASK_ENDPOINT + "/" + taskId, data);
    $http.put(TASK_ENDPOINT + "/" + taskId, data).success(function (resp) {
      updateOk(true)
    }).error(function (err) {
      updateOk(false)
    })
  }

  function getTaskIndexById(taskId) {
    if (!taskId) {
      return -1;
    }

    var index = tasks.findIndex(function (el, idx) {
      if (el.id == taskId) {
        return true
      }
      return false
    });

    return index;
  }

  var service = {};
  service.newTask = initTask;
  service.addTask = addTask;
  service.getTaskById = getTaskById;
  service.removeTask = removeTask;
  service.updateTask = updateTask;
  service.getAllTasks = getAllTasks;
  return service;
});