;(function(ng) {
  'use strict';

  ng.module('demoApp')
    .service('UserDAO', [
      '$q', 'User', 'UserResource',
      function($q, User, UserResource) {
        this.getAll = function() {
          return UserResource
           .get()
           .$promise
           .then(function(users){
             return users;
           })
           .catch(function(err){
             return $q.reject(err)
           });
        };
        this.create = function(user) {
          return UserResource
           .insert(user)
           .$promise
           .then(function(result){
             return result;
           })
           .catch(function(err){
             return $q.reject(err)
           });
        };
      }
    ]);
}(window.angular));
