const { Router } = require('express')
const OrdersController = require('../controllers/OrdersController')
const ensureIsAdmin = require('../middlewares/ensureIsAdmin')
const ensureAuth = require('../middlewares/ensureAuth')

const ordersRoutes = Router()

ordersRoutes.use(ensureAuth)

ordersRoutes.get('/', OrdersController.index)
ordersRoutes.post('/', OrdersController.create)
ordersRoutes.put('/', ensureIsAdmin, OrdersController.update)

module.exports = ordersRoutes
