const { Router } = require('express')

const routes = Router()

const dishRoutes = require('./dish.routes')
const userRoutes = require('./users.routes')
const sessionRoutes = require('./session.routes')

routes.use("/users", userRoutes)
routes.use("/dishes", dishRoutes)
routes.use("/sessions", sessionRoutes)

module.exports = routes