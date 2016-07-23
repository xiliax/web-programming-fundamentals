var app = angular.module("ToDoApp")

app.controller("EditUserController", function ($scope, UserDbService, $location, $routeParams) {
  if (!UserDbService.isAuthenticated()) {
    $location.path('/login')
  }

  $scope.isNew = false;
  $scope.currentUser = UserDbService.getCurrentUser();

  var userId = Number($routeParams.userId);
  $scope.user = UserDbService.getUserById(userId)

  if (!$scope.user) {
    $location.path('/')
  }

  $scope.updateUser = function () {
    UserDbService.updateUser(userId, $scope.user)
    $location.path('/user/list')
  };

  $scope.cancelUser = function () {
    if (!UserDbService.isAdmin()) {
      $location.path('/')
    }

    $location.path('/user/list')
  };

  $scope.removeUser = function (userId) {
    if (!UserDbService.isAdmin()) {
      $location.path('/')
    }

    var user = UserDbService.getUserById(userId)

    var ok = window.confirm("Do really want to delete '" +
      user.username + "'?")

    if (ok) {
      UserDbService.removeUser(userId)
      $location.path('/user/list')
    }
  };
});
