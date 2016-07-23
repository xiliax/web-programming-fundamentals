var app = angular.module("ToDoApp")

app.controller("ListTasksController", function ($scope, TaskDbService, $location, UserDbService) {
  if (!UserDbService.isAuthenticated()) {
    $location.path('/login')
  }

  $scope.setCompleted = function (taskId) {
    var r = TaskDbService.updateTask(taskId, {
      status: "Completed"
    });
    if (r) {
      $scope.tasks = TaskDbService.getAllTasks();
    }
  }
  $scope.tasks = TaskDbService.getAllTasks();
});
