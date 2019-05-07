const express = require('express')
const home = require('./routes')
require('dotenv').config()

const app = express()

app.use(home)

const port = 5000

app.listen(port, () => console.log(`Server started on ${port}`))
