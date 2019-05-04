const express = require('express')
const mongoose = require('mongoose')

const { personSchema } = require('../../schemas')
const { connect } = require('../../helpers/db-helper')

const app = express()

app.get('/deleteUser/*', async (req, res) => {

  if(req.query.id) {

    connect()

    const Person = mongoose.model('Person', personSchema)
    const user = await Person.findOneAndDelete({ _id: req.query.id })

    if(user) {
      res.json({
        message: `I deleted this user, sire`,
        info: user
      })
    } else {
      res.status(404).json({
        message: `I don't know anyone by that id, fellow traveler`
      })
    }

  } else {
    res.status(400).json({
      error: 'Who are you looking for?'
    })
  }


})

module.exports = app