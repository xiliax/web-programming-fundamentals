; (function (ng) {
  'use strict';

  ng.module('demoApp')
    .config([
      '$routeProvider',
      function ($routeProvider) {
        $routeProvider
          .when('/', {
            templateUrl: 'todo/templates/todo.html',
            controller: 'TodoController',
            controllerAs: 'todoCtrl'
          })
          .when('/comment', {
            templateUrl: 'todo/templates/comment.html',
            controller: 'CommentController',
            controllerAs: 'ctrl'
          })
          .otherwise({
            redirectTo: '/'
          });
      }
    ]);
} (window.angular));
