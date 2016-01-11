var app = angular.module('MyTodo', ['ngMaterial']);

app.controller('TodoCtrl', function ($scope) {
    $scope.todos = [];
    $scope.progressLabels = ['Not Started', 'In Progress', 'Completed'];
    var editing = false;
    var editIndex = 0;

    $scope.description = '';
    $scope.progress = '0';

    $scope.editTodo = function (index) {
        var todo = $scope.todos[index];
        editing = true;
        editIndex = index;

        $scope.description = todo.description;
        $scope.progress = todo.progress;
    };

    $scope.deleteTodo = function (index) {
        $scope.todos.splice(index, 1);
    };

    $scope.saveTodo = function () {
        var todo = {
            description: $scope.description,
            progress: $scope.progress
        };

        if (editing) {
            $scope.todos[editIndex] = todo;
            editing = false;
        } else {
            $scope.todos.push(todo);
        }

        clearInputs(evt);
    };

    $scope.clearInputs = function () {
        $scope.description = '';
        $scope.progress = '0';
        editing = false;
    };
});
