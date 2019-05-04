const express = require('express')
const mongoose = require('mongoose')

const { dbURL } = require('../../config.js')
const { personSchema } = require('../../schemas')

const app = express()

app.get('/getUser/*', async (req, res) => {
  console.log(req.query)
  console.log(req.originalUrl)

  if(req.query.id) {

    mongoose.connect(dbURL, { useNewUrlParser: true })
    const db = mongoose.connection
  
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      console.log('connected to db')
    })

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