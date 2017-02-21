"use strict";

const TaskController = require('../controller/task-controller');

module.exports = class taskRoutes {
  static init(router) {
    router
      .route('/api/tasks')
      .get(TaskController.getAll)
      .put(TaskController.updateTask)
      .post(TaskController.createNew);

    router
      .route('/api/tasks/:id')
      .get(TaskController.getById)
      .delete(TaskController.removeById);
  }
}
