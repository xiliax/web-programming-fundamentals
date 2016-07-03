var app = angular.module("ToDoApp")

app.config(function ($routeProvider) {

  $routeProvider
    .when("/", {
      templateUrl: "task-list.html"
      , controller: "ListTasksController"
    })
    .when("/new", {
      templateUrl: "task-edit.html"
      , controller: "AddTaskController"
    })
    .when("/edit/:taskId", {
      templateUrl: "task-edit.html"
      , controller: "EditTaskController"
    })
});

app.service('TaskDbService', function (UserDbService) {
  var tasks = [];
  var uniqueId = 0; // always incrementing

  /** make a new ToDo object and return it */
  function initTask() {
    return {
      title: ''
      , status: 'Not Started'
      , description: ''
    };
  }

  /**
    get a copy of all Tasks if admin user, else just tasks for the current user
   */
  function getAllTasks() {
    if (UserDbService.isAdmin()) {
      return angular.copy(tasks);
    }

    var user = UserDbService.getCurrentUser()

    var userTasks = tasks.filter(function (el) {
      if (el.ownerId == user.id) {
        return true
      }
      return false
    });

    return angular.copy(userTasks);
  }

  /**
    return true if object added, false otherwise
   */
  function addTask(task) {
    if (task) {
      uniqueId += 1;
      // give each object a unique id before sotring
      task.id = uniqueId;

      var user = UserDbService.getCurrentUser()
      task.ownerId = user.id;
      tasks.push(task);

      return true;
    }

    return false;
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
    returns true if object was removed, false otherwise
   */
  function removeTask(taskId) {
    var index = getTaskIndexById(taskId)

    if (index == -1) {
      return false;
    }

    var task = tasks[index];
    // ensure task cannot be remove anyoneelse other than the owner or an admin user
    var currentUser = UserDbService.getCurrentUser();
    if (!UserDbService.isAdmin() && (task.ownerId != currentUser.id)) {
      return false;
    }

    // remove object with task.id, since reference might have changed
    tasks.splice(index, 1)
    return true;
  }

  /**
    returns true if object was updated, false otherwise
   */
  function updateTask(taskId, data) {
    if (!data) {
      return false;
    }

    var index = getTaskIndexById(taskId)

    if (index == -1) {
      return false;
    }

    var task = tasks[index];

    // ensure task is updated by ONLY the owner or an admin user
    var currentUser = UserDbService.getCurrentUser();
    if (!UserDbService.isAdmin() && (task.ownerId != currentUser.id)) {
      return false;
    }

    // ensure data integrity by not allow by allowing blank status or title
    var objectChanged = false;
    // update object with task.id == taskId
    if (data.title) {
      task.title = data.title;
      objectChanged = true;
    }

    if (data.status) {
      task.status = data.status;
      objectChanged = true;
    }

    if (task.description != data.description) {
      task.description = data.description;
      objectChanged = true;
    }

    return objectChanged;
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

app.controller("ListTasksController", function ($scope, TaskDbService, $location, UserDbService) {
  if (!UserDbService.isAuthenticated()) {
    $location.path('/login')
  }

  $scope.tasks = TaskDbService.getAllTasks();
});

app.controller("AddTaskController", function ($scope, TaskDbService, $location, UserDbService) {
  if (!UserDbService.isAuthenticated()) {
    $location.path('/login')
  }

  $scope.task = TaskDbService.newTask();
  $scope.isNew = true;
  $scope.saveTask = function () {
    TaskDbService.addTask($scope.task)
    $location.path('/')
  };

  $scope.cancelTask = function () {
    $location.path('/')
  }
});

app.controller("EditTaskController", function ($scope, TaskDbService, $location, $routeParams, UserDbService) {
  if (!UserDbService.isAuthenticated()) {
    $location.path('/login')
  }

  $scope.isNew = false;
  var taskId = Number($routeParams.taskId);
  $scope.task = TaskDbService.getTaskById(taskId)

  $scope.updateTask = function () {
    if (!UserDbService.isAuthenticated()) {
      $location.path('/login')
    }

    TaskDbService.updateTask(taskId, $scope.task)
    $location.path('/')
  };

  $scope.cancelTask = function () {
    $location.path('/')
  };

  $scope.removeTask = function (taskId) {
    if (!UserDbService.isAuthenticated()) {
      $location.path('/login')
    }

    var task = TaskDbService.getTaskById(taskId)
    if (!task) {
      $location.path('/')
    }

    var ok = window.confirm("Do really want to delete '" +
      task.title + "'?")

    if (ok) {
      TaskDbService.removeTask(taskId)
      $location.path('/')
    }
  };
});
