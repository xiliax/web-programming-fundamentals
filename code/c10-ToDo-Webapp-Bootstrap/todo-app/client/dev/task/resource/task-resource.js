;(function(ng) {
  'use strict';

  ng.module('todo')
    .factory('TaskResource', [
      '$resource',
      function($resource) {
        var _url = '/api/tasks/:id';
        var _params = {
          id: '@id'
        };
        var _method = {
          update: {
            method: 'PUT',
            isArray: false
          },
          insert: {
            method: 'POST',
            isArray: false
          },
          get: {
            method: 'GET',
            isArray: true
          },
          getById: {
            method: 'GET',
            isArray: false
          },
          delete: {
            method: 'DELETE',
            isArray: false
          },
        };

        return $resource(_url, _params, _method);
      }
    ]);
}(window.angular));
