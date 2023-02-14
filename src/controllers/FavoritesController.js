const knex = require('../db/knex')
const AppError = require('../utils/appError')

class FavoritesController{
  async favorite(req, res){
    const user_id = req.user.id
    const { id: dish_id } = req.params

    const checkDish = await knex("dishes").where({id: dish_id})
    
    if(!checkDish) throw new AppError('Não foi possível favoritar o prato.')

    const isFavorite = await knex('favorites')
    .select().where({ user_id, dish_id }).first()
    
    if(isFavorite){
      await knex('favorites').where({ user_id, dish_id}).delete()
      return res.json('Item retirado da lista de favoritos')
    }

    await knex('favorites').insert({user_id, dish_id}).where({user_id})
    return res.json('Item adicionado a lista de favoritos')
  }

  async show(req, res){
    const user_id = req.user.id
    const { id:dish_id } = req.params

    const checkDishFavorite = await  knex('favorites').where({user_id, dish_id}).first()
      
    return res.json(checkDishFavorite)

  }

  async index(req, res){
    const user_id = req.user.id

    const hasFavorites = await knex('favorites').where({user_id})

    if(!hasFavorites) throw new AppError('Token inválido')

    let userFavorites;
    
    userFavorites = await knex('favorites')
    .select([
      "dishes.id",
      "dishes.title",
      "dishes.price"
    ]).where({user_id})
    .innerJoin("dishes", "dishes.id", "favorites.dish_id" )
    .orderBy("dishes.title")
    
    if(!userFavorites.length) return res.json('Usuário não tem pratos favoritos.')

  return res.json(userFavorites)
   
  }
}

module.exports = FavoritesController