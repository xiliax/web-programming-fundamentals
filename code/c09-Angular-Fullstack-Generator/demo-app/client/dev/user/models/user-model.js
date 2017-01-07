; (function (ng) {
  'use strict';

  ng.module('demoApp')
    .factory('User', [
      function () {
        var User = function (user) {
          this.id = '';
          this.username = null;
          this.admin = false;
          ng.extend(this, user)
        };

        User.prototype.isValid = function () {
          return true;
        };

        return User;
      }
    ]);
} (window.angular));
