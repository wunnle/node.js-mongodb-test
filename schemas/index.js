const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: String
})


module.exports = {
  personSchema
}