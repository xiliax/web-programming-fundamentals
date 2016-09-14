var app = angular.module("ToDoApp", ['ngRoute'])

app.config(function($routeProvider) {

  $routeProvider
    .when("/login", {
      templateUrl: "views/login.html",
      controller: "LoginController"
    })
    .when("/user/list", {
      templateUrl: "views/user-list.html",
      controller: "ListUsersController"
    })
    .when("/user/new", {
      templateUrl: "views/user-edit.html",
      controller: "AddUserController"
    })
    .when("/user/edit/:userId", {
      templateUrl: "views/user-edit.html",
      controller: "EditUserController"
    })
    .when("/", {
      templateUrl: "views/task-list.html",
      controller: "ListTasksController"
    })
    .when("/new", {
      templateUrl: "views/task-edit.html",
      controller: "AddTaskController"
    })
    .when("/edit/:taskId", {
      templateUrl: "views/task-edit.html",
      controller: "EditTaskController"
    })
    .when("/user/settings", {
      templateUrl: "views/user-settings.html",
      controller: "UserSettingsController"
    })
    .otherwise("/login")
});

app.controller("LoginController", function($scope, UserDbService, $location) {
  if (UserDbService.isAuthenticated()) {
    UserDbService.logout()
  }

  $scope.login = function(username, password) {
    console.log("call server for login")
    UserDbService.login(username, password, function(errMesg) {
      $scope.password = ''
      $scope.mesg = errMesg
    })
  }
});

app.controller("MainController", function($scope, UserDbService, $rootScope, $location) {
  $scope.authenticated = UserDbService.isAuthenticated()
  $scope.currentUser = UserDbService.getCurrentUser()

  $rootScope.$on("auth", function() {
    $scope.currentUser = UserDbService.getCurrentUser()
    if (UserDbService.isAuthenticated()) {
      $scope.authenticated = true
      $location.path('/') // go to task listing by defualt logged in user
    } else {
      $scope.authenticated = false
    }
  })
});