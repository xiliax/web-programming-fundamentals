"use strict";

const mongoose = require('mongoose');

const _commentSchema = {
    id: {type: Number, required: true},
    subject: {type: String, required: true, trim: true},
    author: {type: String, required: true, trim: true},
    taskId: {type: String, required: true, trim: true},
    body: {type: String, required: false, trim: true},
    createdAt: {type: Date, default: Date.now}
}

module.exports = mongoose.Schema(_commentSchema);
