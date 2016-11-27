var mongoose = require('mongoose');
mongoose.Promise = global.Promise;  // need this to use promises

mongoose.connect('mongodb://localhost/todo');

var Schema = mongoose.Schema;
// step 9 - define Task collection schema
var TaskSchema = new Schema({
    owner: String, // User.username
    title: String,
    status: { type: String, default: 'Not Started' },
    description: String,
    createdOn: { type: Date, default: Date.now },
    modifiedOn: Date
});
// step 10a - create middle/pre-save hook
TaskSchema.pre('save', function (next) {
    if (this.get('_id')) {
        this.set('modifiedOn', Date.now);
    }
    next();
});
// step 10b - create Mongoose collection Model
var Task = mongoose.model('Task', TaskSchema);
// step 11 - create a few tasks for each user
var tasks = [
    { owner: "admin@email.com", title: 'First Admin task' },
    { owner: "admin@email.com", title: 'Second Admin task', status: 'Inprogress' },
    { owner: "admin@email.com", title: 'Third Admin task', status: 'Completed' },
    { owner: "bob@email.com", title: 'Task 1 for Bob' },
    { owner: "bob@email.com", title: 'Task 2 for Bob' },
];

tasks.forEach(function (t) {
    var x = new Task(t);
    x.save().catch(function (err) {
        console.log("Error: Unable to save task:", JSON.stringify(err));
    });
});