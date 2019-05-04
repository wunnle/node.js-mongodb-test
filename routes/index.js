const express = require('express')
const monggoose = require('mongoose')

const dbURL = process.env.MONGO_DB_URL
const app = express()

app.get('/', (req, res) => {

  monggoose.connect(dbURL, { useNewUrlParser: true })

  const db = monggoose.connection
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    res.send('connected to db!')
  })

})

module.exports = app