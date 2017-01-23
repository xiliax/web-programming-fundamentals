"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const CommentSchema = require('../model/comment-model');
const _ = require('lodash');

CommentSchema.statics.getAll = () => {
  return new Promise((resolve, reject) => {
    let _query = {};

    Comment
      .find(_query)
      .exec((err, todos) => {
        err ? reject(err)
          : resolve(todos);
      });
  });
}

CommentSchema.statics.createNew = (comment) => {
  return new Promise((resolve, reject) => {
    if (!_.isObject(comment)) {
      return reject(new TypeError('Todo is not a valid object.'));
    }

    let _c = new Comment(comment);

    _c.save((err, saved) => {
      err ? reject(err)
        : resolve(saved);
    });
  });
}

CommentSchema.statics.removeById = (id) => {
  return new Promise((resolve, reject) => {
    if (!_.isString(id)) {
      return reject(new TypeError('Id is not a valid string.'));
    }

    Comment
      .findByIdAndRemove(id)
      .exec((err, deleted) => {
        err ? reject(err)
          : resolve();
      });
  });
}

const Comment = mongoose.model('Comments', CommentSchema);

module.exports = Comment;
