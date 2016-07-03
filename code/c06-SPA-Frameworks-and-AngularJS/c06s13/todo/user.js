var app = angular.module("ToDoApp")

app.config(function ($routeProvider) {

  $routeProvider
    .when("/user/list", {
      templateUrl: "user-list.html"
      , controller: "ListUsersController"
    })
    .when("/user/new", {
      templateUrl: "user-edit.html"
      , controller: "AddUserController"
    })
    .when("/user/edit/:userId", {
      templateUrl: "user-edit.html"
      , controller: "EditUserController"
    })
});

app.service('UserDbService', function ($rootScope) {
  var users = [];
  var uniqueId = 0; // always incrementing
  var anonymousUser = {
    username: 'anonymous'
    , id: null
    , admin: false
  };
  var currentUser = angular.copy(anonymousUser);

  // add first and only user 'admin:admin'
  addUser({
    username: 'admin'
    , password: 'admin'
    , admin: true
  });

  /** make a new user account object and return it */
  function initUser() {
    return {
      username: ''
      , password: ''
      , admin: false
    };
  }

  /**
    get a copy of all Users
   */
  function getAllUsers() {
    return angular.copy(users);
  }

  /**
    return true if object added, false otherwise
   */
  function addUser(user) {
    if (user) {
      uniqueId += 1;
      // give each object a unique id before sotring
      user.id = uniqueId;
      users.push(user);
      return true;
    }

    return false;
  }

  /**
    returns object if found, null otherwise
   */
  function getUserById(userId) {
    var index = getUserIndexById(userId)

    if (index == -1) {
      return null;
    }

    return angular.copy(users[index])
  }

  /**
    returns true if object was removed, false otherwise
   */
  function removeUser(userId) {
    var index = getUserIndexById(userId)

    if (index == -1) {
      return false;
    }

    // remove object with user.id, since reference might have changed
    console.log("deleteing user at " + index, users)
    users.splice(index, 1)
    console.log("users: ", users)

    return true;
  }

  /**
    returns true if object was updated, false otherwise
   */
  function updateUser(userId, data) {
    if (!data) {
      return false;
    }

    var index = getUserIndexById(userId)

    if (index == -1) {
      return false;
    }

    // non-admin users can ONLY update their account
    if (!isAdminUser() && (currentUser.id != userId)) {
      return false
    }

    var user = users[index]

    // ensure data integrity by not allow by allowing blank status or title
    var objectChanged = false;
    // update object with user.id == userId
    if (data.username) {
      user.username = data.username;
      objectChanged = true;
    }

    if (data.password) {
      user.password = data.password;
      objectChanged = true;
    }

    if (data.admin != user.admin) {
      user.admin = data.admin;
      objectChanged = true;
    }

    return objectChanged;
  }

  function getUserIndexById(userId) {
    if (!userId) {
      return -1;
    }

    var index = users.findIndex(function (el, idx) {
      if (el.id == userId) {
        return true
      }
      return false
    });

    return index;
  }

  function getUserByUsername(username) {
    if (!username) {
      return null;
    }

    var index = users.findIndex(function (el, idx) {
      if (el.username == username) {
        return true
      }
      return false
    });

    return users[index];
  }

  function login(username, password) {
    var user = getUserByUsername(username)
    if (user && user.password === password) {
      currentUser = {
        username: user.username
        , id: user.id
        , admin: user.admin
      }

      $rootScope.$broadcast("auth", {})
      return true
    }

    currentUser = angular.copy(anonymousUser)
    $rootScope.$broadcast("auth", {})
    return false
  }

  function logout() {
    currentUser = angular.copy(anonymousUser)
    $rootScope.$broadcast("auth", {})
  }

  function isAdminUser() {
    return currentUser.admin;
  }

  function getCurrentUser() {
    return currentUser;
  }

  function isAuthenticated() {
    return ('anonymous' != currentUser.username)
  }

  var service = {};
  service.newUser = initUser;
  service.addUser = addUser;
  service.getUserById = getUserById;
  service.removeUser = removeUser;
  service.updateUser = updateUser;
  service.getAllUsers = getAllUsers;
  service.login = login;
  service.logout = logout;
  service.isAdmin = isAdminUser;
  service.getCurrentUser = getCurrentUser;
  service.isAuthenticated = isAuthenticated;
  return service;
});

app.controller("ListUsersController", function ($scope, UserDbService, $location) {
  if (!UserDbService.isAdmin()) {
    $location.path('/')
  }

  $scope.users = UserDbService.getAllUsers();
  $scope.toggleRole = function (userId, flag) {
    UserDbService.updateUser(userId, {
      admin: flag
    });

    $scope.users = UserDbService.getAllUsers();
  };
});

app.controller("AddUserController", function ($scope, UserDbService, $location) {
  if (!UserDbService.isAdmin()) {
    $location.path('/')
  }

  $scope.user = UserDbService.newUser();
  $scope.isNew = true;
  $scope.saveUser = function () {
    UserDbService.addUser($scope.user)
    $location.path('/user/list')
  };

  $scope.cancelUser = function () {
    $location.path('/user/list')
  }
});

app.controller("EditUserController", function ($scope, UserDbService, $location, $routeParams) {
  if (!UserDbService.isAuthenticated()) {
    $location.path('/login')
  }

  $scope.isNew = false;
  $scope.currentUser = UserDbService.getCurrentUser();

  var userId = Number($routeParams.userId);
  $scope.user = UserDbService.getUserById(userId)

  if (!$scope.user) {
    $location.path('/')
  }

  $scope.updateUser = function () {
    UserDbService.updateUser(userId, $scope.user)
    $location.path('/user/list')
  };

  $scope.cancelUser = function () {
    if (!UserDbService.isAdmin()) {
      $location.path('/')
    }

    $location.path('/user/list')
  };

  $scope.removeUser = function (userId) {
    if (!UserDbService.isAdmin()) {
      $location.path('/')
    }

    var user = UserDbService.getUserById(userId)

    var ok = window.confirm("Do really want to delete '" +
      user.username + "'?")

    if (ok) {
      UserDbService.removeUser(userId)
      $location.path('/user/list')
    }
  };
});
