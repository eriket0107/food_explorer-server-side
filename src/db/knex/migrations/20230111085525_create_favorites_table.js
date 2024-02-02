const { v4: uuidv4 } = require('uuid')

exports.up = (knex) =>
  knex.schema.createTable('favorites', (table) => {
    table.increments('id', 36).default(uuidv4())
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
    table
      .integer('dish_id')
      .references('id')
      .inTable('dishes')
      .onDelete('CASCADE')
    table.timestamp('favorited_at').default(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTable('favorites')
