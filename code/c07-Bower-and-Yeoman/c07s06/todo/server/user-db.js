/* 
User db module. Provides method to add, remove, and find users
*/

var dbUsers = []

module.exports = {
    add: add,
    remove: remove,
    update: update,
    getAll: getAll,
    findById: findById,
    findByUsernameAndPasswod: findByUsernameAndPasswod
};

function add(user) {
    // username and password are required
    if (!user.username || !user.password) {
        return false
    }

    // if the 'admin' field isn't provided, set it to false
    if (null == user.admin) {
        user.admin = false
    }

    user.id = dbUsers.length + 1
    dbUsers.push(user);
    return true
}

function remove(userId) {
    var index = getIndexById(userId)

    if (-1 == index) {
        return false
    }

    dbUsers.splice(index, 1)
    return true
}

function update(userId, data) {
    var user = findById(userId)

    if (!user) {
        return false;
    }
    if (data.username) {
        user.username = data.username;
    }
    if (data.password) {
        user.password = data.password;
    }
    if (data.admin != user.admin) {
        user.admin = data.admin;
    }

    return true;
}

function getAll() {
    return dbUsers;
}

/**
  returns object if found, null otherwise
*/
function findById(userId) {
    var index = getIndexById(userId)

    if (index == -1) {
        return null;
    }

    return dbUsers[index]
}

function getIndexById(userId) {
    if (!userId || -1 == userId) {
        return -1;
    }

    var index = dbUsers.findIndex(function (el, idx) {
        if (el.id == userId) {
            return true
        }
        return false
    });

    return index;
}

/** using username and password, in the user */
function findByUsernameAndPasswod(username, password) {
    if (null == username || null == password) {
        return null
    }

    var user = dbUsers.find(function (el) {
        if (el.username == username && el.password == password) {
            return true
        }

        return false
    });

    return user
}