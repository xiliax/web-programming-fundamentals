; (function (ng) {
  'use strict';

  ng.module('demoApp')
    .factory('Comment', [
      function () {
        var Comment = function (comment) {
          this.id = null;
          this.subject = null;
          this.author = null;
          this.taskId = null;
          ng.extend(this, comment)
        };

        var MIN_ACCEPTED_LENGTH = 5;

        Comment.prototype.isValid = function () {
          var _isDefined = ng.isDefined(this.subject) &&
            ng.isDefined(this.author) && ng.isDefined(this.taskId);

          var _isString = ng.isString(this.subject) && ng.isString(this.author) && ng.isString(this.taskId);

          var _isBigEnough = (_isDefined && _isString) ? this.subject.length >= MIN_ACCEPTED_LENGTH : false;

          return _isBigEnough;
        };

        return Comment;
      }
    ]);
} (window.angular));
