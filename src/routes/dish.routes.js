const { Router } = require('express')

const multer = require('multer')


const  DishController  = require('../controllers/DishController')
const  DishImageController  = require('../controllers/DishImageController')

const uploadConfig = require('../config/upload')

const ensureAuth = require('../middlewares/ensureAuth')
const ensureIsAdmin = require('../middlewares/ensureIsAdmin')

const dishController = new DishController()
const dishImageController = new DishImageController()

const upload = multer(uploadConfig.MULTER)


const dishRoutes = Router()

dishRoutes.use(ensureAuth, ensureIsAdmin)


dishRoutes.post("/",  dishController.create)

dishRoutes.patch("/:id", upload.single('foodImg'), dishImageController.update)


module.exports = dishRoutes
