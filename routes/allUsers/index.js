const express = require('express')
const mongoose = require('mongoose')

const { personSchema } = require('../../schemas')
const { connect } = require('../../helpers/db-helper')

const app = express()

app.get('/allUsers/', async (req, res) => {

  connect()

  const Person = mongoose.model('Person', personSchema)
  const user = await Person.find()

  res.json({
    message: `Here are all people I know, fellow traveler`,
    info: user
  })


})

module.exports = app