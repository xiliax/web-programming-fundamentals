var app = angular.module("ToDoApp")

app.controller("AddTaskController", function ($scope, TaskDbService, $location, UserDbService) {
  if (!UserDbService.isAuthenticated()) {
    $location.path('/login')
  }

  $scope.task = TaskDbService.newTask();
  $scope.isNew = true;
  $scope.saveTask = function () {
    $scope.mesg = null
    TaskDbService.addTask($scope.task, function (ok) {
      if (ok) {
        $location.path('/');
      } else {
        $scope.mesg = "Task not saved, please try again later."
      }
    })
  };

  $scope.cancelTask = function () {
    $location.path('/')
  }
});