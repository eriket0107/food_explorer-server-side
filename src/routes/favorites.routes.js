const { Router } = require('express')
const ensureAuth = require('../middlewares/ensureAuth')

const FavoritesController = require('../controllers/FavoritesController')

const favoritesController = new FavoritesController

const favoritesRoutes = Router()



favoritesRoutes.get('/', ensureAuth, favoritesController.index)
favoritesRoutes.get('/:id', ensureAuth, favoritesController.show)
favoritesRoutes.post('/:id', ensureAuth, favoritesController.favorite)

module.exports = favoritesRoutes