var app = angular.module("ToDoApp")

app.controller("ListUsersController", function($scope, UserDbService, $location) {
  $scope.users = []
  if (!UserDbService.isAdmin()) {
    $location.path('/')
  }

  UserDbService.getAllUsers(function(users) {
    $scope.users = users
  });

  $scope.toggleRole = function(userId, flag) {
    UserDbService.updateUser(userId, {
      admin: flag
    });

    UserDbService.getAllUsers(function(users) {
      $scope.users = users
    });
  };
});