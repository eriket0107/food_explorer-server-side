const { Router } = require('express');

const multer = require('multer');


const  DishController  = require('../controllers/DishController');
const  DishImageController  = require('../controllers/DishImageController');

const uploadConfig = require('../config/upload');

const ensureAuth = require('../middlewares/ensureAuth');
const ensureIsAdmin = require('../middlewares/ensureIsAdmin');

const dishController = new DishController();
const dishImageController = new DishImageController();

const upload = multer(uploadConfig.MULTER);


const dishRoutes = Router();


dishRoutes.get('/', dishController.index);
dishRoutes.get('/:id', ensureAuth, dishController.show);
dishRoutes.post('/', upload.single('foodImg'), ensureAuth, ensureIsAdmin, dishController.create);
dishRoutes.put('/:id', ensureAuth, ensureIsAdmin, dishController.update);
dishRoutes.delete('/:id', ensureAuth, ensureIsAdmin, dishController.delete);


dishRoutes.patch('/:id/img', ensureAuth, ensureIsAdmin , upload.single('foodImg'), dishImageController.update);


module.exports = dishRoutes;
