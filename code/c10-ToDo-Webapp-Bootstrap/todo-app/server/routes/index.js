"use strict";

//const TodoRoutes = require('../api/todo/routes/todo-routes');
const TaskRoutes = require('../api/task/routes/task-routes');

const StaticDispatcher = require('../commons/static/index');


module.exports = class Routes {
   static init(app, router) {
     TaskRoutes.init(router);
     
     router
       .route('*')
       .get(StaticDispatcher.sendIndex);
     

     app.use('/', router);
   }
}
