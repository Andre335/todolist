'use strict'
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    period: {
        type: Date,
        required: true
    },
    done: {
        type: Boolean,
        required: true,
        default: false
    }
});

var Task = mongoose.model('Task', taskSchema);
module.exports = Task;