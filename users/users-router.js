const router = require('express').Router();
const bcrypt = require('bcrypt');
const Users = require('./users-model');

router.get('/', (req, res) => {
    Users.find()
    .then(users => {
      res.json(users)
    })
    .catch(err => res.send(err));
  
}); 

router.post('/login', (req, res) => {
  Users.findBy(req.body.username)
    .first()
    .then(user => {
      if (user != null) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.status(200).json({ message: 'login good!'})
        } else {
          res.status(400).json({ message: 'athentication failed'})
        }
      } else {
        res.status(400).json({ message: 'oopsie daisy' })
      }
    })
    .catch(error => {
      res.status(500).json(error.message)
    })
});

router.post('/register', (req, res) => {
  let postData = req.body;
  Users.add(postData)
  .then(users => {
    res.status(201).json({ message: 'user added!'})
  })
  .catch(error => {
    res.status(500).json({ message: 'Failed to create user.' })
  })
})

module.exports = router;