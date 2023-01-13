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


dishRoutes.get("/", dishController.index)
dishRoutes.get("/:id", ensureAuth, dishController.show)
dishRoutes.post("/", ensureIsAdmin, ensureAuth, dishController.create)
dishRoutes.put("/:id", ensureIsAdmin,  ensureAuth,dishController.update)

dishRoutes.patch("/:id", ensureIsAdmin ,upload.single('foodImg'), dishImageController.update)


module.exports = dishRoutes
