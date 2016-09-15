var app = angular.module("ToDoApp")

app.service('UserDbService', function($rootScope, $http) {
  var LOGIN_ENDPOINT = "http://localhost:3000/api/v1/login"
  var USER_ENDPOINT = "http://localhost:3000/api/v1/user"

  // cache of users fetched from backen, only used to find a user to load user-edit view
  var users = []
  var anonymousUser = {
    username: 'anonymous',
    id: null,
    admin: false
  };

  var currentUser = angular.copy(anonymousUser);

  /** make a new user account object and return it */
  function initUser() {
    return {
      username: '',
      password: '',
      admin: false
    };
  }

  /**
    get a copy of all Users
   */
  function getAllUsers(callback) {
    // get all users from api server
    $http.get(USER_ENDPOINT).success(function(resp) {
      // save a local copy when we want to load the user edit form
      users = angular.copy(resp.users)

      callback(angular.copy(users));
    }).error(function(resp, status) {
      users = []
      callback([])
    });
  }

  /**
    user - JavaScript object with key-value pairs
    callback - function(addedOnServer : boolean)
  */
  function addUser(user, callback) {
    if (!user) {
      callback(false)
    }

    // only admin user can add account
    if (!isAdminUser()) {
      callback(false)
    }

    $http.post(USER_ENDPOINT, JSON.stringify(user)).success(function(resp) {
      callback(true)
    }).error(function(resp, status) {
      callback(false)
    })
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
    userId - integer
    callback - function(removedOnServer : boolean)
  */
  function removeUser(userId, callback) {
    if (!userId) {
      callback(false)
    }

    // only admin user can delete account
    if (!isAdminUser()) {
      callback(false)
    }

    $http.delete(USER_ENDPOINT + "/" + userId).success(function(resp) {
      callback(true)
    }).error(function(resp, status) {
      callback(false)
    })
  }

  /**
    call callback with true or false
    userId - integer
    data - JavaScript object, key-value pairs
    callback - function(updatedOnServer : boolean)
   */
  function updateUser(userId, data, callback) {
    if (!userId || !data) {
      callback(false)
    }

    // non-admin users can ONLY update their account
    if (!isAdminUser() && (currentUser.id != userId)) {
      callback(false)
    }

    $http.put(USER_ENDPOINT + "/" + userId, JSON.stringify(data)).success(function(resp) {
      callback(true)
    }).error(function(resp, status) {
      callback(false)
    })
  }

  /**
   * login()
   * username - string 
   * password - string
   * errFunc - function(erMesg : string)
   */
  function login(username, password, errFunc) {
    var userLoginInfo = {
      username: username,
      password: password
    }

    // ask server to authenticate user
    $http.post(LOGIN_ENDPOINT, JSON.stringify(userLoginInfo)).success(function(resp) {
      currentUser = angular.copy(resp)
      $rootScope.$broadcast("auth", {})
    }).error(function(resp, status) {
      errFunc('Login failed, please try again')
    });

  }

  function logout() {
    currentUser = angular.copy(anonymousUser)
    $rootScope.$broadcast("auth", {})
  }

  function isAdminUser() {
    return currentUser.admin;
  }

  function getCurrentUser() {
    return angular.copy(currentUser)
  }

  function isAuthenticated() {
    return ('anonymous' != currentUser.username)
  }

  // ----------------- helper function(s)
  function getUserIndexById(userId) {
    if (!userId) {
      return -1;
    }

    var index = users.findIndex(function(el, idx) {
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

    var index = users.findIndex(function(el, idx) {
      if (el.username == username) {
        return true
      }
      return false
    });

    return users[index];
  }

  // ----------------- functions exposed by service
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