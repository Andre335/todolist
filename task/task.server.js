"use strict"

const Task = require("./task.model");

exports.findAll = async (data) => {
    return await Task.find({});
};

exports.findOne = async (id) => {
    return await Task.findById(id);
};

exports.create = async (data) => {
    const task = new Task(data);
    await task.save();
};

exports.update = async (id, data) => {
    return await Task.findByIdAndUpdate(id, {$set: data});
};

exports.deleteById = async (id) => {
    return await Task.findByIdAndDelete(id);
};

exports.drop = async () => {
    await Task.collection.drop();
};
