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

app.controller("ListItemsController", function ($scope) {
  $scope.items = [
    {
      title: 'Item 1'
    }, {
      title: 'Item 2'
    }
  ];
});

app.controller("AddItemController", function ($scope, $location) {
  $scope.item = {};
  $scope.isNew = true;
  $scope.items = []; // NOTE: all new array of items
  $scope.saveItem = function () {
    $scope.items.push($scope.item)
    $scope.item = {}
    $location.path('/')
  }
});

app.controller("EditItemController", function ($scope, $routeParams, $location) {
  $scope.isNew = false;
  $scope.items = []; // NOTE: all new array of items
  $scope.item = {
    title: 'Item 1, updated'
  }

  $scope.updateItem = function () {
    var selectedIndex = Number($routeParams.id) - 1;
    $scope.items[selectedIndex] = $scope.item
    $location.path('/')
  }
});
