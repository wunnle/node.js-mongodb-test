const express = require('express')
const mongoose = require('mongoose')

const { personSchema } = require('../../schemas')
const { connect } = require('../../helpers/db-helper')

const app = express()

app.get('/getUser/*', async (req, res) => {
  console.log(req.query)
  console.log(req.originalUrl)

  if(req.query.id) {

    connect()

    const Person = mongoose.model('Person', personSchema)
    const user = await Person.find({ name: req.query.id })

    if(user.length > 0) {
      res.json({
        message: `Here is the info you required, fellow traveler`,
        info: user
      })
    } else {
      res.json({
        message: `I don't know anyone by that name, fellow traveler`
      })
    }


  } else {
    res.json({
      error: 'enter a user name'
    })
  }


})

module.exports = app