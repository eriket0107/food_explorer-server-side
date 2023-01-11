exports.up = knex => knex.schema.createTable("orders", table=>{
  table.increments("id")
  table.integer("user_id").references("id").inTable("users")
  table.integer("dish_id").references("id").inTable("dishes")

  table.string('status', 255).default('Pendente')
  table.timestamp('created_at').default(knex.fn.now())
  table.timestamp('updated_at').default(knex.fn.now())
});

exports.down = knex => knex.schema.dropTable("orders")