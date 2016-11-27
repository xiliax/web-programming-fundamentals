// step 1 - load Mongoose library to talk to Mongo server
var mongoose = require('mongoose');
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

