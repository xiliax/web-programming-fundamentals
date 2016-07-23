var app = angular.module("ToDoApp")

app.controller("ListUsersController", function ($scope, UserDbService, $location) {
  if (!UserDbService.isAdmin()) {
    $location.path('/')
  }

  $scope.users = UserDbService.getAllUsers();
  $scope.toggleRole = function (userId, flag) {
    UserDbService.updateUser(userId, {
      admin: flag
    });

    $scope.users = UserDbService.getAllUsers();
  };
});
