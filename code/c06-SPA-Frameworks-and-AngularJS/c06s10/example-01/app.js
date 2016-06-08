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
});

app.controller("MainController", function ($scope) {
  $scope.user = "User X"
});

app.service('ItemDbService', function () {
  var items = [
    {
      title: 'Item 1'
    }, {
      title: 'Item 2'
    }
  ];

  function getAllItems() {
    return items;
  }

  var service = {};
  service.getAllItems = getAllItems;
  return service;
});

app.controller("ListItemsController", function ($scope, ItemDbService) {
  $scope.items = ItemDbService.getAllItems();
});

app.controller("AddItemController", function ($scope, ItemDbService, $location) {
  $scope.item = {};
  $scope.isNew = true;
  $scope.saveItem = function () {
    ItemDbService.getAllItems().push($scope.item)
    $scope.item = {}
    $location.path('/')
  }
});

app.controller("EditItemController", function ($scope, ItemDbService, $location, $routeParams) {
  $scope.isNew = false;
  var selectedIndex = Number($routeParams.id) - 1;
  $scope.item = angular.copy(ItemDbService.getAllItems()[selectedIndex])

  $scope.updateItem = function () {
    ItemDbService.getAllItems()[selectedIndex] = $scope.item
    $location.path('/')
  }
});
