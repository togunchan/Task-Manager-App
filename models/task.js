const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide a name!'],
    trim: true,
    maxLength: [20, 'name cannot be more than twenty characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model('task', taskSchema)
