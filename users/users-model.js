const db = require('../data/dbConfig');

module.exports = {
  add, 
  find,
  findBy
}

function find() {
  return db('users').select('id', 'username')
}

async function add(user) {
  const [id] = await db('users').insert(user);
  return findById(id);
}

function findBy() {
  return db('users')
    .where({ id })
    .first();
}