const express = require('express')
const app = express()

// routes
app.get('/hello', (req, res) => {
    res.send('Task Manager App')
})


const port = 5001
app.listen(port, console.log(`Server is listening on port ${port}....`))

