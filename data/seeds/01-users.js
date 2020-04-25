const bcrypt = require('bcrypt');
const password1 = bcrypt.hashSync('password1', 10);
const password2 = bcrypt.hashSync('password2', 10);
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: "user1", password: password1, firstname: "user", lastname: "one" },
        { username: "user2", password: password2, firstname: "user", lastname: "two" }
      ]);
    });
};