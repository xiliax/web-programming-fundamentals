; (function (ng) {
  'use strict';

  ng.module('demoApp')
    .controller('CommentController', ['Comment', 'CommentDAO',
      function (Comment, CommentDAO) {
        var self = this;
        self.comment = new Comment({})

        self.comments = [];

        self.remove = function (commentId) {
          CommentDAO
            .remove(commentId)
            .then(function(){
              refresh()
            })
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

        function refresh(){
          CommentDAO.getAll()
            .then((comments) => self.comments = comments)
            .catch(err => console.log(err))
        }

        refresh()
        return self;
      }
    ]);
} (window.angular));
