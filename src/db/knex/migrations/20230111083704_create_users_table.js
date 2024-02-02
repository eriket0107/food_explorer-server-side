const { v4: uuidv4 } = require('uuid')

exports.up = (knex) =>
  knex.schema.createTable('users', (table) => {
    table.uuid('id', 36).notNullable().defaultTo(uuidv4()).unique()
    table.text('name')
    table.text('email')
    table.text('password')
    table
      .enum('role', ['customer', 'admin', 'sale'], {
        useNative: true,
        enumName: 'roles',
      })
      .notNullable()
      .defaultTo('customer')
    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
    table.varchar('avatar')
  })

exports.down = (knex) => knex.schema.dropTable('users')
