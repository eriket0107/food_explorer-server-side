const { Router } = require('express')

const routes = Router()

const userRoutes = require('./users.routes')
const sessionRoutes = require('./session.routes')

routes.use("/users", userRoutes)
routes.use("/sessions", sessionRoutes)

module.exports = routes