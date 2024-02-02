const { Router } = require('express')

const multer = require('multer')

const DishController = require('../controllers/DishController')
const DishImageController = require('../controllers/DishImageController')

const uploadConfig = require('../config/upload')

const ensureAuth = require('../middlewares/ensureAuth')
const verifyUserRole = require('../middlewares/verifyRole')

const upload = multer(uploadConfig.MULTER)

const dishRoutes = Router()

dishRoutes.get('/', DishController.index)
dishRoutes.get('/:id', ensureAuth, DishController.show)
dishRoutes.post(
  '/',
  upload.single('foodImg'),
  ensureAuth,
  verifyUserRole(['admin']),
  DishController.create,
)
dishRoutes.put(
  '/:id',
  ensureAuth,
  verifyUserRole(['admin']),
  DishController.update,
)
dishRoutes.delete(
  '/:id',
  ensureAuth,
  verifyUserRole(['admin']),
  DishController.delete,
)

dishRoutes.patch(
  '/:id/img',
  ensureAuth,
  verifyUserRole(['admin']),
  upload.single('foodImg'),
  DishImageController.update,
)

module.exports = dishRoutes
