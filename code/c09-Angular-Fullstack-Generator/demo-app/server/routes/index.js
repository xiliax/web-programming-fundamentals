"use strict";

const TodoRoutes = require('../api/todo/routes/todo-routes');
const CommentRoutes = require('../api/todo/routes/comment-routes');

const StaticDispatcher = require('../commons/static/index');


module.exports = class Routes {
   static init(app, router) {
     TodoRoutes.init(router);
     CommentRoutes.init(router);
     
     router
       .route('*')
       .get(StaticDispatcher.sendIndex);
     

     app.use('/', router);
   }
}
