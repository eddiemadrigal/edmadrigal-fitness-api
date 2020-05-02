const router = require('express').Router();
const Roles = require('./roles-model');

router.get('/', (req, res) => {
  Roles.find()
    .then(roles => {
      res.json(roles)
    })
    .catch(err => res.send(err));
}); 

module.exports = router;