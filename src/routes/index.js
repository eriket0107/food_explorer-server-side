const { Router } = require('express')

const routes = Router()

const userRoutes = require('./users.routes')

routes.use("/users", userRoutes)

module.exports = routes