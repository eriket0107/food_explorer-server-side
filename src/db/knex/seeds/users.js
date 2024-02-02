const { hash } = require('bcrypt')
const { v4: uuidv4 } = require('uuid')

exports.seed = async (knex) => {
  try {
    await knex('users').del()
    await knex('users').insert([
      {
        id: uuidv4(),
        name: 'admin',
        email: 'admin@email.com',
        password: await hash('admin', 8),
        role: 'admin',
      },
      {
        id: uuidv4(),
        name: 'Erik',
        email: 'erik@email.com',
        password: await hash('123', 8),
        role: 'customer',
      },
    ])
  } catch (error) {
    console.log('Error in Seed:', error)
  }
}
