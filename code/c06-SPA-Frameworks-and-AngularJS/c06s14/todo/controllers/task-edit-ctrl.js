var app = angular.module("ToDoApp")

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
