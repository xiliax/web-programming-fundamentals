var app = angular.module("ToDoApp")

app.controller("UserSettingsController", function($scope, UserDbService, $location) {
    if (!UserDbService.isAuthenticated()) {
        $location.path('/login')
    }

    var user = UserDbService.getCurrentUser()
    var userId = user.id

    $scope.user = {
        admin: user.admin
    }
    $scope.changePassword = false

    if (!$scope.user) {
        $location.path('/')
        return
    }

    $scope.updateUser = function() {
        UserDbService.updateUser(userId, $scope.user, function(ok) {
            if (ok) {
                $location.path('/login')
            }
        })
    };

    $scope.cancelUser = function() {
        if (UserDbService.isAdmin()) {
            $location.path('/user/list')
        }

        $location.path('/')
    };

});