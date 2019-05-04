const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.get('/getUser/*', (req, res) => {
  res.send(`welcome, to my humble shop ${req.query.id}`)
  console.log(req.query)
  console.log(req.originalUrl)
})

module.exports = app