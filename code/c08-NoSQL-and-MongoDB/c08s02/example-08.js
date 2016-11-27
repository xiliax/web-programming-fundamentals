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
