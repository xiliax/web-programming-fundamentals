var app = angular.module("ToDoApp")

app.controller("AddUserController", function ($scope, UserDbService, $location) {
  if (!UserDbService.isAdmin()) {
    $location.path('/')
  }

  $scope.user = UserDbService.newUser();
  $scope.isNew = true;
  $scope.saveUser = function () {
    UserDbService.addUser($scope.user)
    $location.path('/user/list')
  };

  $scope.cancelUser = function () {
    $location.path('/user/list')
  }
});
