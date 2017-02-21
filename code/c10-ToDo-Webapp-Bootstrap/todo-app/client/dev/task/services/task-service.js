;(function(ng) {
  'use strict';

  ng.module('todo')
    .service('TaskService', [
      '$q',
      function($q) {
        this.doSomething = function() {
          return $q.when({yo: '!'});
        };
      }
    ]);
}(window.angular));
