const knex = require('../db/knex')
const AppError = require('../utils/appError')
// const DiskStorage = require("../providers/DiskStorage")

class DishController{
  async create(req, res){
    const { title, description, category, price, ingredients } = req.body
    
    
    const checkIfExistsDish = await knex("dishes").where({title}).first()
    
    if(checkIfExistsDish) throw new AppError('Esse prato existe')

    
    if(!title || !description || !price ||!category) throw new AppError('É nessário preencher todos campos para cadastrar o prato.')
    
    const categories = ["Sobremesa", "Bebida", "Prato principal"]

    if(!categories.includes(category)) throw new AppError('Categoria não existe.')
    
    if(!ingredients) throw new AppError("Insira os ingrendientes.")

    const dish_id = await knex("dishes").insert({
      title, 
      description, 
      category, 
      price,
    })
    
    let insertIngredients

    if(ingredients){
      insertIngredients = ingredients.map(name => {
        return{
         name,
         dish_id
        }
      })

      await knex("ingredients").insert(insertIngredients)
    }

    return res.json('Prato cadastrado com sucesso!')
  }


}
module.exports = DishController