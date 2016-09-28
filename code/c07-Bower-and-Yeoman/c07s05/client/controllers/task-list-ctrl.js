var app = angular.module("ToDoApp")

app.controller("ListTasksController", function ($scope, TaskDbService, $location, UserDbService) {
  if (!UserDbService.isAuthenticated()) {
    console.log("returning to login page")
    $location.path('/login')
    return
  }

  $scope.setCompleted = function (taskId) {
    var r = TaskDbService.updateTask(taskId, {
      status: "Completed"
    });
    if (r) {
      TaskDbService.getAllTasks(function (tasks) {
        $scope.tasks = tasks
      });
    }
  };

  TaskDbService.getAllTasks(function (tasks) {
    $scope.tasks = tasks
  });
});