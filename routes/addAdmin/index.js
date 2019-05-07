const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { hash } = require('../../helpers/password-helper')
const jwt = require('jsonwebtoken')



const app = express()
const { adminSchema } = require('../../schemas')

const { connect } = require('../../helpers/db-helper')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/addAdmin', verifyToken, (req, res) => {

  jwt.verify(req.token, process.env.HASHKEY, (error, authdata) => {
    if (error) {
      res.sendStatus(403)
    } else {

      connect()

      const Admin = mongoose.model('Admin', adminSchema)
    
      if (req.body.username && req.body.password) {
        const admin = new Admin({
          username: req.body.username,
          passwordHash: hash(req.body.password)
        })
        admin.save().then(admin => {
          res.json({ admin })
        })
    
      } else {
        res.json({
          error: 'error'
        })
      }

    }
  })

})

function verifyToken(req, res, next) {
  // Get auth header value

  const bearerHeader = req.headers['authorization']

  if (typeof bearerHeader !== 'undefined') {
    // Split at the space

    const bearerToken = bearerHeader.split(' ')[1]

    req.token = bearerToken

    next()

  } else {
    // Forbidden
    res.sendStatus(403)
  }
}

module.exports = app