; (function (ng) {
  'use strict';

  ng.module('demoApp')
    .controller('CommentController', [
      function () {
        var self = this;
        self.comments = [
          { id: 1, subject: 'Really like this', author: 'John Doe' },
          { id: 2, subject: 'awesome stuff', author: 'Jane Doe' },
          { id: 3, subject: 'not so good', author: 'Smither Doe' },
        ];
        return self;
      }
    ]);
} (window.angular));
