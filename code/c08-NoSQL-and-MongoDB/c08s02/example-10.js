var mongoose = require('mongoose');
mongoose.Promise = global.Promise;  // need this to use promises

mongoose.connect('mongodb://localhost/todo');

var Schema = mongoose.Schema;
// step 9 - define Task collection schema
var ObjectId = Schema.ObjectId;

var TaskSchema = new Schema({
    owner: { type: ObjectId, ref: 'User' }, // User._id
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
