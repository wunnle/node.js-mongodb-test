const express = require('express')
const mongoose = require('mongoose')

const app = express()
const { personSchema } = require('../../schemas')

const { connect } = require('../../helpers/db-helper')

app.get('/addUser/*', (req, res) => {
  
  connect()

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