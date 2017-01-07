; (function (ng) {
  'use strict';

  ng.module('demoApp')
    .controller('CommentController', ['Comment', 'CommentDAO',
      function (Comment, CommentDAO) {
        var self = this;
        self.comment = new Comment({})

        self.comments = [
          new Comment({ id: 1, subject: 'Really like this', author: 'John Doe', taskId: 1 }),
          new Comment({ id: 2, subject: 'awesome stuff', author: 'Jane Doe', taskId: 3 }),
          new Comment({ id: 3, subject: 'not so good', author: 'Smither Doe' })
        ];

        self.remove = function (commentId) {
          CommentDAO
            .remove(commentId)
            .catch(function (err) {
              self.mesg = err
            });
        }

        self.fetch = function (commentId) {
          CommentDAO
            .getById(commentId)
            .then(function (result) {
              console.dir(result)
            })
            .catch(function (err) {
              self.mesg = err
            });
        }

        self.create = function (comment) {
          CommentDAO.create(comment)
            .then(function (x) {
              self.comments.push(x)
            })
            .catch(function (err) {
              self.mesg = err;
            })
        }

        return self;
      }
    ]);
} (window.angular));
