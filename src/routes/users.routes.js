const { Router } = require('express')
const UserController = require('../controllers/UserController')
const ensureAuth = require('../middlewares/ensureAuth')

const userController = new UserController()

const userRoutes = Router()


userRoutes.post('/', userController.create)
userRoutes.put('/', ensureAuth ,userController.update)

module.exports = userRoutes