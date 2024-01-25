const { Router } = require('express')

const multer = require('multer')

const DishController = require('../controllers/DishController')
const DishImageController = require('../controllers/DishImageController')

const uploadConfig = require('../config/upload')

const ensureAuth = require('../middlewares/ensureAuth')
const ensureIsAdmin = require('../middlewares/ensureIsAdmin')

const upload = multer(uploadConfig.MULTER)

const dishRoutes = Router()

dishRoutes.get('/', DishController.index)
dishRoutes.get('/:id', ensureAuth, DishController.show)
dishRoutes.post(
  '/',
  upload.single('foodImg'),
  ensureAuth,
  ensureIsAdmin,
  DishController.create,
)
dishRoutes.put('/:id', ensureAuth, ensureIsAdmin, DishController.update)
dishRoutes.delete('/:id', ensureAuth, ensureIsAdmin, DishController.delete)

dishRoutes.patch(
  '/:id/img',
  ensureAuth,
  ensureIsAdmin,
  upload.single('foodImg'),
  DishImageController.update,
)

module.exports = dishRoutes
