const Task = require('../models/task')

const getAllTasks = (req, res) => {
    console.log('I am getting all tasks...')
    res.send('Get All Tasks')
}

const createTask = async (req, res) => {
    const task = await Task.create(req.body)
    console.log(task)
    res.status(201).json({ task })
}

const getTask = (req, res) => {
    res.json({ id: req.params })
}

const updateTask = (req, res) => {
    res.send('Update Task')
}

const deleteTask = (req, res) => {
    res.send('Delete Task')
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}