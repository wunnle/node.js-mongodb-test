const express = require('express')
const monggoose = require('mongoose')

const dbURL = process.env.MONGO_DB_URL

const app = express()

const personSchema = new monggoose.Schema({
  name: String
})  

app.get('/addPerson', (req, res) => {

  console.log('hey')

  let output

  monggoose.connect(dbURL, { useNewUrlParser: true })

  const db = monggoose.connection
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('connected to db')
  })
  
  const Person = monggoose.model('Person', personSchema)

  if(req.query.name) {
    const user = new Person({ name: req.query.name })
  
    user.save((err, user) => {
      if (err) return console.log(err)
      console.log(user)
      output = user
    })
  } else {
    output = {
      error: 'req.query.name does not exist'
    }
  }

  res.json(output)

})

module.exports = app