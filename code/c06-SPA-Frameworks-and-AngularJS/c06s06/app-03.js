    function MyController($scope) {
      function initTask() {
        $scope.task = {
          title: ''
          , status: 'Not Started'
          , description: ''
        };
      }

      $scope.list = [];
      initTask();
      $scope.isEdit = false

      $scope.setCompleted = function (index) {
        $scope.list[index].status = 'Completed'
      }

      $scope.editItem = function (index) {
        $scope.task = angular.copy($scope.list[index])
        $scope.isEdit = true
        $scope.index = index
      };

      $scope.updateItem = function () {
        $scope.list[$scope.index] = $scope.task;
        initTask();
        $scope.isEdit = false
      };

      $scope.removeItem = function (index) {
        $scope.list.splice(index, 1)
      };

      $scope.addItem = function () {
        var todoItem = $scope.task
        $scope.list.push(todoItem);
        initTask();
      };
    }

    var app = angular.module("ToDoApp", [])
    app.controller("MainController", MyController)
