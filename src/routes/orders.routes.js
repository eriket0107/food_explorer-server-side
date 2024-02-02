const { Router } = require('express')
const OrdersController = require('../controllers/OrdersController')
const verifyUserRole = require('../middlewares/verifyRole')
const ensureAuth = require('../middlewares/ensureAuth')

const ordersRoutes = Router()

ordersRoutes.use(ensureAuth)

ordersRoutes.get('/', OrdersController.index)
ordersRoutes.post('/', OrdersController.create)
ordersRoutes.put('/', verifyUserRole(['admin']), OrdersController.update)

module.exports = ordersRoutes
