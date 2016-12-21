; (function (ng) {
  'use strict';

  ng.module('demoApp')
    .controller('CommentController', ['Comment',
      function (Comment) {
        var self = this;

        self.comments = [
          new Comment({ id: 1, subject: 'Really like this', author: 'John Doe', taskId: 1 }),
          new Comment({ id: 2, subject: 'awesome stuff', author: 'Jane Doe', taskId: 3 }),
          new Comment({ id: 3, subject: 'not so good', author: 'Smither Doe' })
        ];

        var i = 0;
        for(; i < self.comments.length; i++){
          var x = self.comments[i]
          console.log(x.id, x.isValid())
        }

        return self;
      }
    ]);
} (window.angular));
