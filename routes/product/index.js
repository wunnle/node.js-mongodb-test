const express = require('express')

const app = express()

app.get('/product/*', (req, res) => {
  res.send('product')
})

module.exports = app