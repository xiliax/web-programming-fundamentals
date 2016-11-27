// step 1 - load Mongoose library to talk to Mongo server
var mongoose = require('mongoose');
// step 2 - collect to Mongo database
mongoose.connect('mongodb://localhost/todo');

var adminData = { username: "admin@email.com", password: "admin" };