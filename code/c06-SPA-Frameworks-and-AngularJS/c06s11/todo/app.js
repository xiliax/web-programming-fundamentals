var app = angular.module("ToDoApp", ['ngRoute'])

app.config(function ($routeProvider) {

  $routeProvider
    .when("/", {
      templateUrl: "list.html"
      , controller: "ListTasksController"
    })
    .when("/new", {
      templateUrl: "edit.html"
      , controller: "AddTaskController"
    })
    .when("/edit/:taskId", {
      templateUrl: "edit.html"
      , controller: "EditTaskController"
    })
    .otherwise("/")
});

app.controller("MainController", function ($scope) {
  $scope.user = "User X"
});

app.service('TaskDbService', function () {
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
    get a copy of all Tasks
   */
  function getAllTasks() {
    return angular.copy(tasks);
  }

  /**
    return true if object added, false otherwise
   */
  function addTask(task) {
    if (task) {
      uniqueId += 1;
      // give each object a unique id before sotring
      task.id = uniqueId;
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

    // ensure data integrity by not allow by allowing blank status or title
    var objectChanged = false;
    // update object with task.id == taskId
    if (data.title) {
      tasks[index].title = data.title;
      objectChanged = true;
    }

    if (data.status) {
      tasks[index].status = data.status;
      objectChanged = true;
    }

    if (tasks[index].description != data.description) {
      tasks[index].description = data.description;
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

app.controller("ListTasksController", function ($scope, TaskDbService) {
  $scope.tasks = TaskDbService.getAllTasks();
  $scope.setCompleted = function (taskId) {
    TaskDbService.updateTask(taskId, {
      status: 'Completed'
    });

    $scope.tasks = TaskDbService.getAllTasks();
  };
});

app.controller("AddTaskController", function ($scope, TaskDbService, $location) {
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

app.controller("EditTaskController", function ($scope, TaskDbService, $location, $routeParams) {
  $scope.isNew = false;
  var taskId = Number($routeParams.taskId);
  $scope.task = TaskDbService.getTaskById(taskId)

  $scope.updateTask = function () {
    TaskDbService.updateTask(taskId, $scope.task)
    $location.path('/')
  };

  $scope.cancelTask = function () {
    $location.path('/')
  };

  $scope.removeTask = function (taskId) {
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
