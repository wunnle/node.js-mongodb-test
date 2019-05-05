const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const { personSchema } = require('../../schemas')
const { connect } = require('../../helpers/db-helper')

const app = express()

app.use(cors())
app.options('*', cors());

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