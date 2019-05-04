const express = require('express')
const mongoose = require('mongoose')

const { dbURL } = require('../../config.js')

const app = express()
const { personSchema } = require('../../schemas')

app.get('/addUser', (req, res) => {

  mongoose.connect(dbURL, { useNewUrlParser: true })

  const db = mongoose.connection

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('connected to db')
  })

  const Person = mongoose.model('Person', personSchema)

  if (req.query.name) {
    const user = new Person({ name: req.query.name })
    user.save().then(user => {
      res.json({ user })
    })

  } else {
    res.json({
      error: 'req.query.name does not exist'
    })
  }
})

module.exports = app