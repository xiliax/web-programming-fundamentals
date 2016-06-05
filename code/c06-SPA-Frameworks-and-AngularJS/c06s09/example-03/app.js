var app = angular.module("ToDoApp", ['ngRoute'])

app.config(function ($routeProvider) {

  $routeProvider
    .when("/", {
      templateUrl: "list.html"
      , controller: "ListItemsController"
    })
    .when("/new", {
      templateUrl: "edit.html"
      , controller: "AddItemController"
    })
    .when("/edit/:id", {
      templateUrl: "edit.html"
      , controller: "EditItemController"
    })
    .otherwise("/")
})

app.controller("MainController", function ($scope, $rootScope) {
  $scope.user = 'User X';
  $rootScope.items = [
    {
      title: 'Item 1'
    }, {
      title: 'Item 2'
    }
  ];
});

app.controller("ListItemsController", function ($scope) {});

app.controller("AddItemController", function ($scope, $rootScope, $location) {
  $scope.item = {};
  $scope.isNew = true;
  $scope.saveItem = function () {
    $rootScope.items.push($scope.item)
    $scope.item = {}
    $location.path('/')
  }
});

app.controller("EditItemController", function ($scope, $rootScope, $routeParams, $location) {
  $scope.isNew = false;
  var selectedIndex = Number($routeParams.id) - 1;
  $scope.item = angular.copy($rootScope.items[selectedIndex])

  $scope.updateItem = function () {
    $rootScope.items[selectedIndex] = $scope.item
    $location.path('/')
  }
});
