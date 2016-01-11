var todos = [];
var progressLabels = ['Not Started', 'In Progress', 'Completed'];
var editing = false;
var editIndex = 0;

function saveTodo(evt) {
    evt.preventDefault();
    var descEl = document.getElementById('description');
    var description = descEl.value;
    var progressEl = document.getElementById('progress');
    var progress = progressEl.value;

    var todo = {
        description: description,
        progress: progress
    };

    if (editing) {
        todos[editIndex] = todo;
        editing = false;
    } else {
        todos.push(todo);
    }

    clearInputs(evt);
    updateListing();
}

function updateListing() {
    var length = todos.length;
    var i = 0;
    var row = null;
    var all = '';
    for (i = 0; i < length; i = i + 1) {
        row = '<tr>' +
            '<td>' + (i + 1) + '</td>' +
            '<td>' + todos[i].description + '</td>' +
            '<td>' + progressLabels[todos[i].progress] + '</td>' +
            '<td>' +
            '  <button onclick="deleteTodo(' + i + ')">Delete</button>' +
            '  <button onclick="editTodo(' + i + ')">Edit</button>' +
            '</td>' +
            '</tr>';

        all = all + row;
    }

    var tableEl = document.getElementById('listing');
    tableEl.innerHTML = all;
}

function deleteTodo(index) {
    todos.splice(index, 1);
    updateListing();
}

function editTodo(index) {
    var todo = todos[index];
    editing = true;
    editIndex = index;

    var descEl = document.getElementById('description');
    descEl.value = todo.description;
    var progressEl = document.getElementById('progress');
    progressEl.selectedIndex = 0;
}

function clearInputs(evt) {
    evt.preventDefault();

    var descEl = document.getElementById('description');
    var progressEl = document.getElementById('progress');

    descEl.value = '';
    progressEl.selectedIndex = 0;
    editing = false;
}
