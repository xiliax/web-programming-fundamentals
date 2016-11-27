// step 1 - load Mongoose library to talk to Mongo server
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;  // need this to use promises
// step 2 - collect to Mongo database
mongoose.connect('mongodb://localhost/todo');
// step 3 - define User collection schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String,
    createdOn: { type: Date, default: Date.now }
});
// step 4 - create Mongoose collection Model
var User = mongoose.model('User', UserSchema);

var adminData = { username: "admin@email.com", password: "admin" };
// step 5 - create model instance and Save it
var admin = new User(adminData);
admin.save().catch(function (err) {
    console.log("Save issue: ", JSON.stringify(err))
});

console.log("Saved Admin id:", JSON.stringify(admin._id));
// step 6 - add more user(s)
var bobData = { username: "bob@email.com", password: "bob" };
var bob = new User(bobData);
bob.save().catch(function (err) {
    console.log("Save issue: ", JSON.stringify(err))
});
// step 8 - find one document *MATCHING* search criteria
var query = { username: "admin@email.com" };
setTimeout(function () {
    User.findOne(query, function (err, doc) {
        if (err) {
            console.log("findOne({...}) err:", JSON.stringify(err));
        } else {
            console.log("findOne({...}):", JSON.stringify(doc));
        }
    });
}, 1);
// step 9 - define Task collection schema
var TaskSchema = new Schema({
    owner: String, // User._id
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
    { owner: admin._id, title: 'First Admin task' },
    { owner: admin._id, title: 'Second Admin task', status: 'Inprogress' },
    { owner: admin._id, title: 'Third Admin task', status: 'Completed' },
    { owner: bob._id, title: 'Task 1 for Bob' },
    { owner: bob._id, title: 'Task 2 for Bob' },
];

tasks.forEach(function (t) {
    var x = new Task(t);
    x.save().catch(function (err) {
        console.log("Error: Unable to save task:", JSON.stringify(err));
    });
});
// *IMPORTANT* -- This is a hack: delay here a bit to allow Mongo to 
//                save the data before we try to query for it
setTimeout(function () {
    // step 12 - find all Tasks for specified user
    Task.find({ 'owner': bob._id }, function (err, docs) {
        if (err) {
            console.log("Error:", JSON.stringify(err));
        } else {
            docs.forEach((d) => {
                console.log("Found:", d.title);
            });
        }
    });
}, 1);
