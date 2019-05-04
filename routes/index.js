const express = require('express')
const mongoose = require('mongoose')

const dbURL = process.env.MONGO_DB_URL
const app = express()

app.get('/', (req, res) => {

  mongoose.connect(dbURL, { useNewUrlParser: true })

  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    res.send('connected to db!')
  })

})

module.exports = app