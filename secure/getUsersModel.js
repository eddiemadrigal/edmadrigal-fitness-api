const db = require('../data/dbConfig');
const bcrypt = require('bcrypt');

module.exports = {
  add, 
  find,
  findBy,
  findById
}

function find() {
  return db('users').select('id', 'username', 'password', 'lname', 'fname')
}

function add(user) {
  const username = user.username;
  const password = user.password;
  const fname = user.fname;
  const lname = user.lname;
  let roleid = 1;
  if (user.roleid) {
    roleid = user.roleid;
  } 
  return db('users')
    .returning('id')
    .insert({
      username, fname, lname,
      password: bcrypt.hashSync(password, 10)
    })
    .then(res => {
      return db('user_role')
        .insert({
          userid: res[0],
          roleid
        })
  });
}

function findBy(username) {
  return db('users')
    .where({username})
    .select('id', 'fname', 'lname', 'username', 'password')
    .first()
}

function findById() {
  
}