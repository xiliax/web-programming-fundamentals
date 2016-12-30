var app = angular.module("DemoApp", [])

app.controller("MainController", function ($scope, $q) {
    function add(a, b) {
        var d = $q.defer()

        // takes some time to get result
        setTimeout(function () {
            var r = a + b;
            if (0 > r) {
                d.reject("negative value")
            }
            else {
                d.resolve(r)
            }
        }, 500)

        return d.promise;
    }

    var now = Date.now()
    add(3, 7)
        .then(function (result) {
            return add(result, 5)
        })
        .then(function (result) {
            return add(result, -20)
        })
        .then(function (result) {
            $scope.result = result
        })
        .catch(function (errMsg) {
            $scope.err = errMsg
        })
        .finally(function(){
            $scope.elaspedTime = Date.now() - now
        })
})

