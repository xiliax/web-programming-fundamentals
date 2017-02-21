;(function(ng) {
  'use strict';

  ng.module('todo')
    .config([
      '$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/task/edit/:id', {
            templateUrl: 'task/templates/task-edit.html',
            controller: 'TaskEditController',
            controllerAs: 'ctrl'
          })
          .when('/task/create', {
            templateUrl: 'task/templates/task-edit.html',
            controller: 'TaskCreateController',
            controllerAs: 'ctrl'
          })
          .when('/', {
            templateUrl: 'task/templates/task-list.html',
            controller: 'TaskListController',
            controllerAs: 'ctrl'
          })
          .otherwise({
            redirectTo: '/'
          });
      }
    ]);
}(window.angular));
