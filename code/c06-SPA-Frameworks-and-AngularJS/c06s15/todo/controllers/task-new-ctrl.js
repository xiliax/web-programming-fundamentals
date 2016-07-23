var app = angular.module("ToDoApp")

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
