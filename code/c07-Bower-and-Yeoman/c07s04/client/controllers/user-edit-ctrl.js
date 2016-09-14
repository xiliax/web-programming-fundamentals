var app = angular.module("ToDoApp")

app.controller("EditUserController", function($scope, UserDbService, $location, $routeParams) {
  if (!UserDbService.isAdmin()) {
    $location.path('/')
  }

  $scope.isNew = false;
  $scope.currentUser = UserDbService.getCurrentUser();

  var userId = Number($routeParams.userId);
  $scope.user = UserDbService.getUserById(userId)

  if (!$scope.user) {
    $location.path('/user/list')
  }

  $scope.updateUser = function() {
    UserDbService.updateUser(userId, $scope.user, function(updatedOnServer) {
      if (updatedOnServer) {
        $location.path('/user/list')
      }
    })
  };

  $scope.cancelUser = function() {
    $location.path('/user/list')
  };

  $scope.removeUser = function(userId) {
    var user = UserDbService.getUserById(userId)

    var okToDelete = window.confirm("Do really want to delete '" +
      user.username + "'?")

    if (okToDelete) {
      UserDbService.removeUser(userId, function(deletedOnServer) {
        if (deletedOnServer) {
          $location.path('/user/list')
        }
      })
    }
  };
});