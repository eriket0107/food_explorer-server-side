const { Router } = require('express')
const ensureAuth = require('../middlewares/ensureAuth')

const FavoritesController = require('../controllers/FavoritesController')

const favoritesRoutes = Router()

favoritesRoutes.get('/', ensureAuth, FavoritesController.index)
favoritesRoutes.get('/:id', ensureAuth, FavoritesController.show)
favoritesRoutes.post('/:id', ensureAuth, FavoritesController.create)

module.exports = favoritesRoutes
