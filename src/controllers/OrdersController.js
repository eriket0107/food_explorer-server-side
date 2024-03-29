const knex = require('../db/knex')

class OrdersController {
  async create(req, res) {
    const { orderItem, status } = req.body
    const user_id = req.user.id

    const order_id = await knex('orders').insert({
      status,
      user_id,
    })

    const orderId = await knex('orders').where({ id: order_id }).first()

    const itemsInsert = orderItem.map((item) => {
      return {
        title: item.title,
        quantity: item.quantity,
        dish_id: item.id,
        order_id: orderId.id,
      }
    })

    await knex('items').insert(itemsInsert)

    return res.json(orderId)
  }

  async index(req, res) {
    const user_id = req.user.id

    const user = await knex('users').where({ id: user_id }).first()

    if (!user.isAdmin) {
      const orders = await knex('items')
        .where({ user_id })
        .select([
          'orders.id',
          'orders.user_id',
          'orders.status',
          'orders.totalPrice',
          'orders.created_at',
        ])

        .innerJoin('orders', 'orders.id', 'items.order_id')
        .groupBy('orders.id')

      const items = await knex('items')
      const ordersWithItems = orders.map((order) => {
        const orderItem = items.filter((item) => item.order_id === order.id)
        return {
          ...order,
          items: orderItem,
        }
      })
      return res.json(ordersWithItems)
    } else {
      const orders = await knex('items')
        .select([
          'orders.id',
          'orders.user_id',
          'orders.status',
          'orders.totalPrice',
          'orders.created_at',
        ])

        .innerJoin('orders', 'orders.id', 'items.order_id')
        .groupBy('orders.id')

      const items = await knex('items')
      const ordersWithItems = orders.map((order) => {
        const orderItem = items.filter((item) => item.order_id === order.id)

        return {
          ...order,
          items: orderItem,
        }
      })

      return res.json(ordersWithItems)
    }
  }

  async update(req, res) {
    const { id, status } = req.body

    await knex('orders')
      .update({ status, updated_at: knex.fn.now() })
      .where({ id })

    return res.json('Atualizado com sucesso.')
  }
}

module.exports = OrdersController
