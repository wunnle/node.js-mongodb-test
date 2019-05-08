const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const verifyToken = require('../../middlewares/veriyToken')
const { hash } = require('../../helpers/password-helper')
const { adminSchema } = require('../../schemas')
const { connect } = require('../../helpers/db-helper')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/addAdmin', verifyToken, (req, res) => {

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
    console.log('heyo')
    res.json({
      error: 'enter username & password of new admin'
    })
  }

})


module.exports = app