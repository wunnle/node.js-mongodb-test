const express = require('express')
const monggoose = require('mongoose')

const dbURL = process.env.MONGO_DB_URL

const app = express()
const personSchema = new monggoose.Schema({
  name: String
})

app.get('/addUser', (req, res) => {

  monggoose.connect(dbURL, { useNewUrlParser: true })

  const db = monggoose.connection

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('connected to db')
  })

  const Person = monggoose.model('Person', personSchema)

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