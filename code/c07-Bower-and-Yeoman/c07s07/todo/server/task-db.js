/* 
Task db module. Provides method to add, remove, and find tasks
*/

var dbTasks = []

module.exports = {
    add: add,
    remove: remove,
    update: update,
    getAll: getAll,
    findById: findById,
};

function add(task) {
    // title and ownerId are required
    if (!task.title || !task.ownerId) {
        return false
    }

    // if the 'status' field isn't provided, set it to 'Not started'
    if (null == task.status) {
        task.status = 'Not started'
    }

    task.id = dbTasks.length + 1
    dbTasks.push(task);
    return true
}

function remove(taskId) {
    var index = getIndexById(taskId)

    if (-1 == index) {
        return false
    }

    dbTasks.splice(index, 1)
    return true
}

function update(taskId, data) {
    var task = findById(taskId)

    if (!task) {
        return false;
    }
    if (data.title) {
        task.title = data.title;
    }

    if (data.status) {
        task.status = data.status;
    }

    if (data.description != task.description) {
        task.description = data.description;
    }

    return true;
}

function getAll() {
    return dbTasks;
}

/**
  returns object if found, null otherwise
*/
function findById(taskId) {
    var index = getIndexById(taskId)

    if (index == -1) {
        return null;
    }

    return dbTasks[index]
}

function getIndexById(taskId) {
    if (!taskId || -1 == taskId) {
        return -1;
    }

    var index = dbTasks.findIndex(function (el, idx) {
        if (el.id == taskId) {
            return true
        }
        return false
    });

    return index;
}