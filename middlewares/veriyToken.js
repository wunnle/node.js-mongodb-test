const jwt = require('jsonwebtoken')


function verifyToken(req, res, next) {
  // Get auth header value

  const bearerHeader = req.headers['authorization']

  if (typeof bearerHeader !== 'undefined') {
    // Split at the space

    const bearerToken = bearerHeader.split(' ')[1]

    jwt.verify(bearerToken, process.env.HASHKEY, (error) => {
      if (error) {
        res.sendStatus(403)
      } else {
        next()
      }
    })

  } else {
    res.sendStatus(403)
  }
}

module.exports = verifyToken