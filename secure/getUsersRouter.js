const router = require('express').Router();
const bcrypt = require('bcrypt');
const Users = require('./getUsersModel');
const jwt = require('jsonwebtoken');

router.get('/accounts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
    Users.find()
    .then(users => {
      res.json(users)
    })
    .catch(err => res.send(err));
    }
  })
  
}); 

router.post('/login', (req, res) => {
  Users.findBy(req.body.username)
    .first()
    .then(user => {
      if (user == null) {
        res.status(400).json({ message: 'user not found'})
      }
      try {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          jwt.sign({ user }, 'secretkey', (err, token) => {
            res.json({
              token
            })
          })
        } else {
          res.json({ message: 'Invalid Credentials!' })
        }
      } catch {
        res.status(500).json()
      }
    })
    .catch(error => {
      res.status(500).json(error.message)
    })
});


function verifyToken(req, res, next) {
  // token should be sent in the header as value to Authorization
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403); // user is forbidden
  }
}

module.exports = router;