"use strict";

const mongoose = require('mongoose');

const _taskSchema = {
  subject: {type: String, required: true, trim: true},
  body: {type: String, required: false, trim: true},
  ownerId: {type: String, required: true, trim: true},
  done: {type: Boolean, required: true},
  createdOn: {type: Date, default: Date.now}
}

module.exports = mongoose.Schema(_taskSchema);
