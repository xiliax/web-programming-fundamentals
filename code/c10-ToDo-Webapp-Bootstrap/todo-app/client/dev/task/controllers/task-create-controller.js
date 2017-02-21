; (function (ng) {
    'use strict';

    ng.module('todo')
        .controller('TaskCreateController', ["$location", "Task", 'TaskDAO',
            function ($location, Task, TaskDAO) {
                var self = this;
                self.task = new Task()

                self.createTask = function (task) {
                    TaskDAO.createTask(task)
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
                
                return self;
            }
        ]);
}(window.angular));
