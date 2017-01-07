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
          .when('/admin/users', {
            templateUrl: 'user/templates/users-list.html',
            controller: 'UserListController',
            controllerAs: 'ctrl'
          })
          .otherwise({
            redirectTo: '/'
          });
      }
    ]);
} (window.angular));
