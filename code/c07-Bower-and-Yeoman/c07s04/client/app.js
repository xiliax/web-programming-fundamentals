var app = angular.module("ToDoApp", ['ngRoute'])

app.config(function ($routeProvider) {

  $routeProvider
    .when("/login", {
      templateUrl: "views/login.html"
      , controller: "LoginController"
    })
    .when("/user/list", {
      templateUrl: "views/user-list.html"
      , controller: "ListUsersController"
    })
    .when("/user/new", {
      templateUrl: "views/user-edit.html"
      , controller: "AddUserController"
    })
    .when("/user/edit/:userId", {
      templateUrl: "views/user-edit.html"
      , controller: "EditUserController"
    })
    .when("/", {
      templateUrl: "views/task-list.html"
      , controller: "ListTasksController"
    })
    .when("/new", {
      templateUrl: "views/task-edit.html"
      , controller: "AddTaskController"
    })
    .when("/edit/:taskId", {
      templateUrl: "views/task-edit.html"
      , controller: "EditTaskController"
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
