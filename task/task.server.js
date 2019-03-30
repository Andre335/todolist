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

exports.deleteById = async (id) => {
    await task.findByIdAndDelete(id);
};

exports.drop = async () => {
    await Task.collection.drop();
};
