
exports.up = function(knex) {
  return knex.schema

  // users table
  .createTable('users', users => {
    users
      .increments();
    users
      .string('username', 30)
      .notNullable()
      .unique();
    users
      .string('password', 30)
      .notNullable();
    users
      .string('firstname', 30);
    users
      .string('lastname', 30);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
