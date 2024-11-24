const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')
const mongoose = require('mongoose')
const { createCustomError } = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({}) // this one gets all tasks
  res.status(200).json({ success: true, data: { tasks, nbHits: tasks.length } })
})

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  if (!mongoose.Types.ObjectId.isValid(taskID)) {
    return res.status(400).json({ msg: `Invalid ID format: ${taskID}` })
  }
  const task = await Task.findOne({ _id: taskID })
  if (!task) {
    return next(createCustomError(`No task with ID: ${taskID}`, 404))
    // return res.status(404).json({ msg: `No task with ID: ${taskID}` })
  }
  res.status(200).json({ task })
})

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Task.findByIdAndDelete({ _id: taskID })
  if (!task) {
    return next(createCustomError(`No task with ID: ${taskID}`, 404))
  }
  res.status(200).json({ task })
})

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  })
  if (!task) {
    return next(createCustomError(`No task with ID: ${taskID}`, 404))
  }
  console.log(task)
  res.status(200).json({ task })
})

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}
