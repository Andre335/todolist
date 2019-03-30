'use strict';
var Task = require('./task.server')

exports.findAll = async (req, res) => {
    try {
        const result = await Task.findAll();
        if (result.length == 0) return res.status(404).send({message: "Tasks not found"})
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};

exports.findOne = async (req, res) => {
    try {
        const taskID = req.params.id;
        const result = await Task.findOne(taskID);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).send({message: "Task not found"});
        }
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};

exports.create = async (req, res) => {
    try {
        await Task.create(req.body);
        res.status(201).json(req.body);
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}

exports.deleteById = async (req, res) => {
    try {
        const taskID = req.params.id;
        await Task.deleteById(taskID);
        res.status(202).send({message: "Task deleted"});
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}