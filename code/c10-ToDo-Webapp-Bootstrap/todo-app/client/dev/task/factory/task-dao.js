; (function (ng) {
  'use strict';

  ng.module('todo')
    .factory('TaskDAO', [
      '$q',
      'Task',
      'TaskResource',
      function ($q, Task, TaskResource) {
        var TaskDAO = function () { };

        TaskDAO.prototype.getAll = function () {
          var _onSuccess = function (tasks) {
            return tasks; // this will be returned as a resolved promise
          };

          var _onError = function (error) {
            return $q.reject(error); // this will be returned as a rejected promise
          };

          return TaskResource
            .get()
            .$promise
            .then(_onSuccess)
            .catch(_onError);
        };

        TaskDAO.prototype.createTask = function (task) {
          if (!ng.isObject(task) || !(task instanceof Task) || !task.isValid()) {
            return $q.reject(new TypeError('Invalid task to be created.'));
          }

          var _onSuccess = function (task) {
            return new Task(task);
          };

          var _onError = function (error) {
            return $q.reject(error);
          };

          return TaskResource
            .insert(task)
            .$promise
            .then(_onSuccess)
            .catch(_onError);
        };

        TaskDAO.prototype.deleteTask = function (id) {
          if (!ng.isString(id)) {
            return $q.reject(new TypeError('Invalid id for deletion.'));
          }

          var _onSuccess = function () {
            return;
          };

          var _onError = function (error) {
            return $q.reject(error);
          };

          return TaskResource
            .delete({
              id: id
            })
            .$promise
            .then(_onSuccess)
            .catch(_onError);
        };

        TaskDAO.prototype.getTaskById = function (id) {
          if (!ng.isString(id)) {
            return $q.reject(new TypeError('Invalid id to retrieve task.'));
          }

          var _onSuccess = function (task) {
            return new Task(task);
          };

          var _onError = function (error) {
            return $q.reject(error);
          };

          return TaskResource
            .getById({
              id: id
            })
            .$promise
            .then(_onSuccess)
            .catch(_onError);
        };

        // TODO: 1 - Implement TaskDAO.prototype.updateTask()
        TaskDAO.prototype.updateTask = function (task) {
          if (!ng.isObject(task) || !(task instanceof Task) || !task.isValid()) {
            return $q.reject(new TypeError('Invalid task to be updated.'));
          }

          var _onSuccess = function (task) {
            return new Task(task);
          };

          var _onError = function (error) {
            return $q.reject(error);
          };

          return TaskResource
            .update(task)
            .$promise
            .then(_onSuccess)
            .catch(_onError);
        };

        return new TaskDAO();
      }
    ]);
}(window.angular));
