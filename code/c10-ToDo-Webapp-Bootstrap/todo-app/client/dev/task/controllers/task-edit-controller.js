; (function (ng) {
    'use strict';

    ng.module('todo')
        .controller('TaskEditController', ["$location", '$routeParams', "Task", 'TaskDAO',
            function ($location, $routeParams, Task, TaskDAO) {
                var self = this;
                self.task = null;

                // get the task to edit from the backend
                TaskDAO.getTaskById($routeParams.id)
                    .then(function (task) {
                        self.task = new Task(task)
                    })
                    .catch(function (error) {
                        $location.path('/')
                        return
                    });

                self.updateTask = function (task) {
                    TaskDAO.updateTask(task)
                        .then(function (task) {
                            $location.path('/')
                        })
                        .catch(function (error) {
                            self.mesg = error
                        })
                };

                self.cancelUpdate = function () {
                    $location.path('/')
                };

                self.deleteTask = function (id) {
                    TaskDAO.deleteTask(id)
                        .then(function () {
                            $location.path('/')
                        })
                        .catch(function (error) {
                            self.mesg = error;
                        })
                };
                return self;
            }
        ]);
}(window.angular));
