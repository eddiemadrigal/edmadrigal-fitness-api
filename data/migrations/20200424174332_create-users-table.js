exports.up = function(knex) {
  return knex.schema
  .createTable('users', users => {
    users
      .increments();
    users
      .string('username', 30)
      .notNullable()
      .unique();
    users
      .string('password', 128)
      .notNullable();
    users
      .string('fname', 30);
    users
      .string('lname', 30);
  })

  .createTable('role',role => {
    role.increments();
    role
      .string('title')
      .notNullable()
      .unique();
  })

  .createTable('classes', classes => {
    classes
    .increments();
    classes
      .string('classname')
      .unsigned()
      .notNullable()
      .unique();
    classes
      .string('classdescription')
  })

  .createTable('class_schedule', class_schedule => {
    class_schedule
      .increments();
    class_schedule 
      .integer('instructorid')
      .unsigned();
    class_schedule
      .foreign('instructorid')
      .references('id')
      .inTable('users')
      .onDelete('cascade');
    class_schedule 
      .integer('classid')
      .unsigned();
    class_schedule
      .foreign('classid')
      .references('id')
      .inTable('classes')
      .onDelete('cascade');
    class_schedule
      .datetime('start_date');
    class_schedule
      .datetime('end_date');
    class_schedule
      .datetime('start_time');
    class_schedule
      .datetime('end_time');
    })

  .createTable('user_role',user_role =>{
   user_role
    .integer('userid')
    .unsigned();
   user_role
    .foreign('userid')
    .references('id')
    .inTable('users')
    .onDelete('cascade');
   user_role
    .integer('roleid')
    .unsigned();
   user_role
    .foreign('roleid')
    .references('id')
    .inTable('role')
    .onDelete('cascade');
  })
  
  .createTable('class_user',class_user => {
    class_user
      .integer('classid')
      .unsigned();
    class_user
      .foreign('classid')
      .references('id')
      .inTable('classes')
      .onDelete('cascade');
    class_user
      .integer('userid')
      .unsigned()
    class_user
      .foreign('userid')
      .references('id')
      .inTable('users')
      .onDelete('cascade');
  })

  .createTable('user_registration', user_registration => {
    user_registration
      .integer('userid')
      .unsigned();
    user_registration
      .foreign('userid')
      .references('id')
      .inTable('users')
      .onDelete('cascade');
    user_registration
      .integer('scheduleid')
      .unsigned()
    user_registration
      .foreign('scheduleid')
      .references('id')
      .inTable('class_schedule')
      .onDelete('cascade');
  })
  
};
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('role')
    .dropTableIfExists('user_role')
    .dropTableIfExists('class_user')
    .dropTableIfExists('classes')
    .dropTableIfExists('class_schedule');
};