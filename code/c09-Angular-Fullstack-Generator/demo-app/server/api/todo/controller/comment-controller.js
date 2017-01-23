"use strict";

const CommentDAO = require('../dao/comment-dao');

module.exports = class CommentController {
  static getAll(req, res) {
    CommentDAO
      .getAll()
      .then(comment => res.status(200).json(comment))
      .catch(error => res.status(400).json(error));
  }

  static createNew(req, res) {
    let _comment = req.body;

    CommentDAO
      .createNew(_comment)
      .then(comment => res.status(201).json(comment))
      .catch(error => res.status(400).json(error));
  }

  static removeById(req, res) {
    let _id = req.params.id;

    CommentDAO
      .removeById(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }
}
