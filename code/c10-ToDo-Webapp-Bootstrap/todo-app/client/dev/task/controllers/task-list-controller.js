; (function (ng) {
  'use strict';

  ng.module('todo')
    .controller('TaskListController', ['TaskDAO',
      function (TaskDAO) {
        var self = this;
        self.tasks = []
        self.mesg = "";

        function refreshTasks() {
          TaskDAO.getAll()
            .then(function (tasks) {
              self.tasks = tasks;
            })
            .catch(function (error) {
              self.mesg = error;
            });
        };

        refreshTasks();
        return self;
      }
    ]);
} (window.angular));
