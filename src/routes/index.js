const { Router } = require('express')

const routes = Router()

const dishRoutes = require('./dish.routes')
const userRoutes = require('./users.routes')
const ordersRoutes = require('./orders.routes')
const sessionRoutes = require('./session.routes')
const favoriteRoutes = require('./favorites.routes')

routes.use("/users", userRoutes)
routes.use("/dishes", dishRoutes)
routes.use("/orders", ordersRoutes)
routes.use("/sessions", sessionRoutes)
routes.use("/favorites", favoriteRoutes)

module.exports = routes