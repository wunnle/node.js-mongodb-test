const mongoose = require('mongoose')
const { dbURL } = require('../config')
require('dotenv').config()

function connect() {
  mongoose.connect(dbURL, { useNewUrlParser: true })
  const db = mongoose.connection

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('connected to db')
  })
}


module.exports = {
  connect
}