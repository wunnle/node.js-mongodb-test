const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const { adminSchema } = require('../../schemas')
const { connect } = require('../../helpers/db-helper')
const { compare } = require('../../helpers/password-helper')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.post('/login', async (req, res) => {

  if(req.body.username && req.body.password) {
    connect()

    const Admin = mongoose.model('Admin', adminSchema)
    const admins = await Admin.find({ username: req.body.username })

    const admin = admins[0]

    console.log(admin)

    if(admin.username && admin.passwordHash) {

      console.log('comparing')

      const result = compare(req.body.password, admin.passwordHash)

      if(result) {
        jwt.sign({ admin }, process.env.HASHKEY, { expiresIn: '2 days' }, (error, token) => {
          res.json({ token })
        })
      } else {
        res.sendStatus(403)
      }

    } else {
      res.json({
        message: 'user does not exist'
      })
    }

  } else {
    res.sendStatus(403)
  }
  

})

module.exports = app