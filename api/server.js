const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const helmet = require('helmet');

const usersRouter = require('../users/users-router.js');
const classesRouter = require('../classes/classes-router');
const rolesRouter = require('../roles/roles-router');
const userroleRouter = require('../userrole/userrole-router');
const secureLoginRouter = require('../secure/getUsersRouter');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/users', usersRouter);
server.use('/api/classes', classesRouter);
server.use('/api/roles', rolesRouter);
server.use('/api/userrole', userroleRouter);
server.use('/api/secure', secureLoginRouter);

server.use('/', (req, res) => { 
  res.json({ message: 'API up ...'})
}) ;

server.use('/api/test', (req, res) => {
  res.json({ message: 'pass!' })
})

function verifyToken(req, res, next) {
  // token should be sent in the headeer as value to Authorization
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

module.exports = server;