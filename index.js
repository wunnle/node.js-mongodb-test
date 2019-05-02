const express = require('express')
const home = require('./routes')

const app = express()

app.use(home)


const port = 5000
app.listen(port, () => console.log(`Server started on ${port}`))

