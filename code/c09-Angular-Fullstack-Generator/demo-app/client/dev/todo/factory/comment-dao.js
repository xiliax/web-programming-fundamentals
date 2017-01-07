; (function (ng) {
  'use strict';

  ng.module('demoApp')
    .factory('CommentDAO', ['$q', 'Comment', 'CommentResource',
      function ($q, Comment, CommentResource) {
        var CommentDAO = function () { };


        CommentDAO.prototype.getAll = function(){
          return CommentResource
            .get(c)
            .$promise
            .then(function (results) {
              return results;
            })
            .catch(function (err) {
              return $q.reject(err)
            });
        }

        CommentDAO.prototype.getById = function(id){
           var c = {id:id}

          CommentResource
            .getById(c)
            .$promise
            .then(function (result) {
              return result;
            })
            .catch(function (err) {
              return $q.reject(err)
            });
        }

        CommentDAO.prototype.remove = function(id){
           var c = {id:id}

          return CommentResource
            .delete(c)
            .$promise
            .then(function (result) {
              return;
            })
            .catch(function (err) {
              $q.reject(err)
            });
        }

        CommentDAO.prototype.create = function (comment) {
          var c = new Comment(comment)

          return CommentResource
            .insert(c)
            .$promise
            .then(function (result) {
              return new Comment(result)
            })
            .catch(function (err) {
              return $q.reject(err)
            });
        }

        return new CommentDAO;
      }
    ]);
} (window.angular));
