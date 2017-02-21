"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const TaskSchema = require('../model/task-model');
const _ = require('lodash');

TaskSchema.statics.getAll = () => {
  return new Promise((resolve, reject) => {
    let _query = {};

    Task
      .find(_query)
      .exec((err, todos) => {
        err ? reject(err)
          : resolve(todos);
      });
  });
}

TaskSchema.statics.createNew = (task) => {
  return new Promise((resolve, reject) => {
    if (!_.isObject(task)) {
      return reject(new TypeError('Task is not a valid object.'));
    }

    let _t = new Task(task);

    _t.save((err, saved) => {
      err ? reject(err)
        : resolve(saved);
    });
  });
};

TaskSchema.statics.updateTask = (task) => {
  return new Promise((resolve, reject) => {
    if (!_.isObject(task)) {
      return reject(new TypeError('Task is not a valid object.'));
    }

    if (!task._id) {
      return reject(new TypeError('Task is not a valid object, expecing _id property.'));
    }

    let _query = {_id: task._id}; // create query to find document to update
    delete task._id;  // don't specify _id as one of the fields to update

    Task.updateOne(_query, {$set: task})
    .exec((err, updated) => {
      err ? reject(err)
        : resolve(updated);
    });
  });
};

TaskSchema.statics.getById = (id) => {
  return new Promise((resolve, reject) => {
    if (!_.isString(id)) {
      return reject(new TypeError('Id is not a valid string.'));
    }

    Task
      .findById(id)
      .exec((err, todo) => {
        err ? reject(err)
          : resolve(todo);
      });
  });
};

TaskSchema.statics.removeById = (id) => {
  return new Promise((resolve, reject) => {
    if (!_.isString(id)) {
      return reject(new TypeError('Id is not a valid string.'));
    }

    Task
      .findByIdAndRemove(id)
      .exec((err, deleted) => {
        err ? reject(err)
          : resolve();
      });
  });
}

const Task = mongoose.model('task', TaskSchema);

module.exports = Task;
