"use strict";

const TaskDAO = require('../dao/task-dao');

module.exports = class TaskController {
  static getAll(req, res) {
    TaskDAO
      .getAll()
      .then(task => res.status(200).json(task))
      .catch(error => res.status(400).json(error));
  }

  static createNew(req, res) {
    let _task = req.body;

    TaskDAO
      .createNew(_task)
      .then(task => res.status(201).json(task))
      .catch(error => res.status(400).json(error));
  }

  static updateTask(req, res) {
    let _task = req.body;

    TaskDAO
      .updateTask(_task)
      .then(task => res.status(201).json(task))
      .catch(error => res.status(400).json(error));
  }

  static getById(req, res) {
    let _id = req.params.id;

    TaskDAO
      .getById(_id)
      .then(task => res.status(200).json(task))
      .catch(error => res.status(400).json(error));
  }

  static removeById(req, res) {
    let _id = req.params.id;

    TaskDAO
      .removeById(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }
}
