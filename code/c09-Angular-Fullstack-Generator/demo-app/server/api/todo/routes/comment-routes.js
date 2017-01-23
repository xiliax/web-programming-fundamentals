"use strict";

const CommentController = require('../controller/comment-controller');

module.exports = class CommentRoutes {
  static init(router) {
    router
      .route('/api/comments')
      .get(CommentController.getAll)
      .post(CommentController.createNew);

    router
      .route('/api/comments/:id')
      .delete(CommentController.removeById);
  }
}
