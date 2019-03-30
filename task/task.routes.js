const express = require('express')
var Task = require('./task.controller')
var router = express.Router()

// Return All Tasks
router.get('/', Task.findAll)

// Return One Task by ID
router.get('/:id', Task.findOne)

// Create One Task
router.post('/', Task.create)

// Delete Task by ID
router.delete('/:id', Task.deleteById)

// Update Tasks
router.put('/:id', Task.update)

module.exports = router


