const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: String
})

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  passwordHash: { 
    type: String,
    required: true
  }
})


module.exports = {
  personSchema,
  adminSchema
}