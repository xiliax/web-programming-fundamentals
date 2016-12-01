'use strict';

/**
 * @ngdoc service
 * @name demoAppApp.taskService
 * @description
 * # taskService
 * Service in the demoAppApp.
 */
angular.module('demoAppApp')
  .service('taskService', function () {

    var service = {};

    function foo() {
      return [13, 90, 103, 89, 87, 45, 63]
    }

    service.getNumbers = foo;

    return service;
  });
