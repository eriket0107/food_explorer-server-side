const { Router } = require('express')
const SessionController = require('../controllers/SessionController')

const sessionRoutes = Router()

sessionRoutes.post('/', SessionController.create)

module.exports = sessionRoutes
