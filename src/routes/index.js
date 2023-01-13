const { Router } = require('express')

const routes = Router()

const userRoutes = require('./users.routes')
const dishRoutes = require('./dish.routes')
const sessionRoutes = require('./session.routes')
const favoriteRoutes = require('./favorites.routes')

routes.use("/users", userRoutes)
routes.use("/dishes", dishRoutes)
routes.use("/sessions", sessionRoutes)
routes.use("/favorites", favoriteRoutes)

module.exports = routes