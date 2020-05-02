const router = require('express').Router();
const UserRoles = require('./userrole-model');

router.get('/', (req, res) => {
  UserRoles.find()
    .then(roles => {
      res.json(roles)
    })
    .catch(err => res.send(err));
}); 

module.exports = router;