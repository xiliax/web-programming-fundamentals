var app = angular.module("ToDoApp")

app.controller("AddUserController", function($scope, UserDbService, $location) {
  if (!UserDbService.isAdmin()) {
    $location.path('/')
  }

  $scope.user = UserDbService.newUser();
  $scope.isNew = true;
  $scope.saveUser = function() {
    UserDbService.addUser($scope.user, function(addedOnServer) {
      $scope.mesg = ''
      if (addedOnServer) {
        $location.path('/user/list')
      } else {
        $scope.mesg = "Unable to add user at this time. Please try again."
      }
    })
  };

  $scope.cancelUser = function() {
    $location.path('/user/list')
  }
});