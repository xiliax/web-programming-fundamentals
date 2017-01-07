; (function (ng) {
  'use strict';

  ng.module('demoApp')
    .controller('UserListController', ['User', 'UserDAO',
      function (User, UserDAO) {
        var self = this;

        self.users = [
          new User({ id: 1, username: "bob@email.com", admin: false }),
          new User({ id: 2, username: "sam@email.com", admin: true })
        ];

        self.create = function(user){
          UserDAO.create(user)
          .then(function(result){
            self.users.push(result)
          })
          .catch(function(err){
            self.mesg= err;
          })
        }

        
        return self;
      }
    ]);
} (window.angular));
