const knex = require('../db/knex')
const AppError = require('../utils/appError')
const DiskStorage = require('../providers/DiskStorage')

class DishController {
  async create(req, res) {
    const { title, description, category, price, ingredients } = req.body

    const checkIfExistsDish = await knex('dishes').where({ title }).first()

    if (checkIfExistsDish) throw new AppError('Esse prato existe')

    const foodImg = req.file.filename

    const diskStorage = new DiskStorage()

    const filename = await diskStorage.saveFile(foodImg)

    if (!title || !description || !price || !category || !foodImg)
      throw new AppError(
        'É nessário preencher todos campos para cadastrar o prato.',
      )

    const categories = ['main', 'dissert', 'drinks']

    if (!categories.includes(category))
      throw new AppError('Categoria não existe.')

    if (!ingredients) throw new AppError('Insira os ingrendientes.')
    const dish_id = await knex('dishes').insert({
      title,
      description,
      category,
      price,
      foodImg: filename,
    })

    let insertIngredients

    if (ingredients) {
      if (typeof ingredients === 'string') {
        insertIngredients = {
          name: ingredients,
          dish_id: dish_id[0],
        }
        await knex('ingredients').insert(insertIngredients)
        return res.json('Prato cadastrado com sucesso!')
      } else {
        insertIngredients = ingredients.map((name) => {
          return {
            name,
            dish_id: dish_id[0],
          }
        })
        await knex('ingredients').insert(insertIngredients)
        return res.json('Prato cadastrado com sucesso!')
      }
    }
  }

  async update(req, res) {
    const { title, description, category, price, ingredients } = req.body
    const { id } = req.params

    const dish = await knex('dishes').where({ id }).first()

    dish.title = title ?? dish.title
    dish.description = description ?? dish.description
    dish.category = category ?? dish.category
    dish.price = price ?? dish.price

    let insertIngredients

    if (!ingredients.length)
      throw new AppError('Não há nenhum ingrediente inserido.')

    if (ingredients) {
      await knex('ingredients').where({ dish_id: dish.id }).delete()

      insertIngredients = ingredients.map((name) => {
        return {
          name,
          dish_id: dish.id,
        }
      })

      await knex('ingredients').insert(insertIngredients)
    } else {
      insertIngredients = await knex('ingredients').where({ dish_id: dish.id })
    }

    await knex('dishes')
      .select('*')
      .update({
        title,
        description,
        category,
        price,
        updated_at: knex.fn.now(),
      })
      .where({ id })

    return res.json({ dish, insertIngredients })
  }

  async index(req, res) {
    const { title, dishIngredients } = req.query

    let dishes

    if (dishIngredients) {
      const filterIngredients = dishIngredients
        .split(',')
        .map((ingredient) => ingredient.trim())

      dishes = await knex('ingredients')
        .select([
          'dishes.id',
          'dishes.title',
          'dishes.description',
          'dishes.category',
          'dishes.price',
          'dishes.foodImg',
        ])
        .whereLike('dishes.title', `%${title}%`)
        .whereIn('name', filterIngredients)
        .innerJoin('dishes', 'dishes.id', 'ingredients.dish_id')
        .groupBy('dishes.id')
        .orderBy('dishes.title')
    } else {
      dishes = await knex('dishes')
        .whereLike('title', `%${title}%`)
        .orderBy('title')
    }

    const allIngredients = await knex('ingredients')

    const dishesWithIngredients = dishes.map((dish) => {
      const dishIngredient = allIngredients.filter(
        (ingredient) => ingredient.dish_id === dish.id,
      )

      return {
        ...dish,
        dishIngredients: dishIngredient,
      }
    })

    return res.status(201).json(dishesWithIngredients)
  }

  async show(req, res) {
    const { id } = req.params

    const dish = await knex('dishes').where({ id }).first()
    const ingredients = await knex('ingredients')
      .where({ dish_id: id })
      .orderBy('name')

    return res.json({
      ...dish,
      ingredients,
    })
  }

  async delete(req, res) {
    const { id } = req.params

    await knex('dishes').where({ id }).delete()

    return res.json('Prato excluído com sucesso!')
  }
}
module.exports = DishController
