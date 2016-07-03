var app = angular.module("ToDoApp", ['ngRoute'])

app.config(function ($routeProvider) {

  $routeProvider
    .when("/login", {
      templateUrl: "login.html"
      , controller: "LoginController"
    })
    .otherwise("/login")
});

app.controller("LoginController", function ($scope, UserDbService, $location) {
  UserDbService.logout()

  $scope.login = function (username, password) {
    if (UserDbService.login(username, password)) {
      $location.path('/')
    } else {
      $scope.password = ''
      $scope.mesg = 'Login credential incorrect. Please try again'
    }
  }
});

app.controller("MainController", function ($scope, UserDbService, $rootScope) {
  $scope.authenticated = UserDbService.isAuthenticated()
  $scope.currentUser = UserDbService.getCurrentUser()

  $rootScope.$on("auth", function () {
    $scope.authenticated = UserDbService.isAuthenticated()
    $scope.currentUser = UserDbService.getCurrentUser()
  })
});
