const { Router } = require('express')

const routes = Router()

const userRoutes = require('./users.routes')

routes.use(userRoutes)

module.exports = routes