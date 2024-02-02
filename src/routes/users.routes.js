const { Router } = require('express')

const multer = require('multer')

const ensureAuth = require('../middlewares/ensureAuth')
const verifyUserRole = require('../middlewares/verifyRole')

const uploadConfig = require('../config/upload')

const UserController = require('../controllers/UserController')
const UserAvatarController = require('../controllers/UserAvatarController')

const upload = multer(uploadConfig.MULTER)

const userRoutes = Router()

userRoutes.post('/', UserController.create)
userRoutes.put('/', ensureAuth, UserController.update)
userRoutes.get('/', ensureAuth, UserController.getCurrentUser)
userRoutes.get(
  '/index',
  ensureAuth,
  verifyUserRole(['admin']),
  UserController.index,
)
userRoutes.delete(
  '/',
  ensureAuth,
  verifyUserRole(['admin']),
  UserController.delete,
)

userRoutes.patch(
  '/',
  ensureAuth,
  upload.single('avatar'),
  UserAvatarController.update,
)

module.exports = userRoutes
