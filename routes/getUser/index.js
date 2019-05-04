const express = require('express')
const mongoose = require('mongoose')

const { personSchema } = require('../../schemas')
const { connect } = require('../../helpers/db-helper')

const app = express()

app.get('/getUser/*', async (req, res) => {

  if(req.query.name) {

    connect()

    const Person = mongoose.model('Person', personSchema)
    const user = await Person.find({ name: req.query.name })

    if(user.length > 0) {
      res.json({
        message: `Here is the info you required, fellow traveler`,
        info: user
      })
    } else {
      res.status(404).json({
        message: `I don't know anyone by that name, fellow traveler`
      })
    }


  } else {
    res.status(400).json({
      error: 'Who are you looking for?'
    })
  }


})

module.exports = app