var app = angular.module("ToDoApp")

app.controller("EditTaskController", function ($scope, TaskDbService, $location, $routeParams, UserDbService) {
  if (!UserDbService.isAuthenticated()) {
    $location.path('/login')
  }

  $scope.isNew = false;
  var taskId = Number($routeParams.taskId);
  $scope.task = TaskDbService.getTaskById(taskId)

  $scope.updateTask = function () {
    $scope.mesg = ""
    if (!UserDbService.isAuthenticated()) {
      $location.path('/login')
    }

    TaskDbService.updateTask(taskId, $scope.task, function (updated) {
      if (updated) {
        $location.path('/')
      } else {
        $scope.mesg = "Task not updated on server, please try again later!"
      }
    })
  };

  $scope.cancelTask = function () {
    $location.path('/')
  };

  $scope.removeTask = function (taskId) {
    $scope.mesg = ""
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
      TaskDbService.removeTask(taskId, function (removed) {
        if (removed) {
          $location.path('/')
        } else {
          $scope.mesg = "Task not removed on server, please try again later!"
        }
      })
    }
  };
});