const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')

// middleware
app.use(express.static('./public'))
app.use(express.json())

// routes
app.use('/api/v1/tasks', tasks)
app.use(notFound)

// app.get('/api/v1/tasks')       -get all the data
// app.post('/api/v1/tasks')      -create a new task
// app.get('/api/v1/tasks')       -get single data
// app.patch('/api/v1/tasks')     -update task
// app.delete('/api/v1/tasks')    -delete task

const port = 5001

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}....`))
  } catch (error) {
    console.log(error)
  }
}

start()
