const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send(`Welcome to mongodb test! Btw api key is ${process.env.MYAPIKEY}`)
})

module.exports = app