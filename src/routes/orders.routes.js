const { Router } = require('express')
const OrdersController = require('../controllers/OrdersController')
const ensureIsAdmin = require('../middlewares/ensureIsAdmin')
const ensureAuth = require('../middlewares/ensureAuth')

const ordersController = new OrdersController()

const ordersRoutes = Router()

ordersRoutes.use(ensureAuth)

ordersRoutes.get('/', ordersController.index)
ordersRoutes.post('/', ordersController.create)
ordersRoutes.put('/', ensureIsAdmin, ordersController.update)

module.exports = ordersRoutes
