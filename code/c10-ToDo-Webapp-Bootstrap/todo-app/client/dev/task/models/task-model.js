; (function (ng) {
  'use strict';

  ng.module('todo')
    .factory('Task', [
      function () {
        var Task = function (task) {
          this.subject = '';
          this.body = '';
          this.ownerId = 'sam';
          this.done = false;
          this.createdOn = null;
          ng.extend(this, task)
        };

        var MIN_ACCEPTED_LENGTH = 5;

        Task.prototype.isValid = function () {
          var _isDefined = ng.isDefined(this.subject);
          var _isString = ng.isString(this.subject);
          return _isString && _isDefined && (this.subject.length >= MIN_ACCEPTED_LENGTH);
        };

        return Task;
      }
    ]);
} (window.angular));
