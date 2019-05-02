const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send(`Welcome to mongodb test! Btw the secret is ${process.env.DASECRET}`)
})

module.exports = app