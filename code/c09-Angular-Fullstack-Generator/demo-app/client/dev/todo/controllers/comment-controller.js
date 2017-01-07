; (function (ng) {
  'use strict';

  ng.module('demoApp')
    .controller('CommentController', ['Comment', 'CommentResource',
      function (Comment, CommentResource) {
        var self = this;
        self.comment = new Comment({})

        self.comments = [
          new Comment({ id: 1, subject: 'Really like this', author: 'John Doe', taskId: 1 }),
          new Comment({ id: 2, subject: 'awesome stuff', author: 'Jane Doe', taskId: 3 }),
          new Comment({ id: 3, subject: 'not so good', author: 'Smither Doe' })
        ];

        var i = 0;
        for (; i < self.comments.length; i++) {
          var x = self.comments[i]
          console.log(x.id, x.isValid())
        }

        self.remove = function (commentId) {
          var c = {id:commentId}

          CommentResource
            .delete(c)
            .$promise
            .then(function (result) {
              console.dir(result)
            })
            .catch(function (err) {
              self.mesg = err
            });
        }

        self.fetch = function (commentId) {
          var c = {id:commentId}

          CommentResource
            .getById(c)
            .$promise
            .then(function (result) {
              console.dir(result)
            })
            .catch(function (err) {
              self.mesg = err
            });
        }

        self.create = function (comment) {
          var c = new Comment(comment)

          CommentResource
            .insert(c)
            .$promise
            .then(function (result) {
              self.comments.push(result)
            })
            .catch(function (err) {
              self.mesg = err
            });
        }

        return self;
      }
    ]);
} (window.angular));
