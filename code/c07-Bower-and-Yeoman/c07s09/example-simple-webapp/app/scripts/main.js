var app = angular.module("MyApp", ['ngResource']);

app.controller("MainController", function($scope){
    $scope.message = "Hello, World!";
    $scope.signedIn = function(){
        return false;  // TODO: Fix this later
    }
});