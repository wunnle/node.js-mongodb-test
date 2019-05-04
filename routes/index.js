const express = require('express')
const mongo = require('mongodb').MongoClient;

const app = express()

app.get('/', (req, res) => {

  mongo.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true }, function (err, client) {
    if (err) {
      res.json({
        message: 'Welcome to mongodb test! Something went wrong while connecting.',
        status: 'fail'
      })
      console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
    }
    res.json({
      message: 'Welcome to mongodb test! Connected to db!',
      status: 'success'
    })
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
  });


})

module.exports = app