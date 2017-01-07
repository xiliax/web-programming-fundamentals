;(function(ng) {
  'use strict';

  ng.module('demoApp')
    .factory('User', [
      function() {
        var User = function() {
          this.something = 123;
        };

        User.prototype.isValid = function() {
          return !!this.something;
        };

        return User;
      }
    ]);
}(window.angular));
