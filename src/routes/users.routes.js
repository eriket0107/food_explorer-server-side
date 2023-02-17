const { Router } = require('express');

const multer = require('multer');

const ensureAuth = require('../middlewares/ensureAuth');
const ensureIsAdmin = require('../middlewares/ensureIsAdmin');

const uploadConfig = require('../config/upload');

const UserController = require('../controllers/UserController');
const UserAvatarController = require('../controllers/UserAvatarController');


const upload = multer(uploadConfig.MULTER);

const userController = new UserController();
const userAvatarController = new UserAvatarController();

const userRoutes = Router();

userRoutes.post('/', userController.create);
userRoutes.put('/', ensureAuth, userController.update);
userRoutes.get('/', ensureAuth, ensureIsAdmin, userController.index);

userRoutes.patch('/', ensureAuth, upload.single('avatar'), userAvatarController.update);

module.exports = userRoutes;