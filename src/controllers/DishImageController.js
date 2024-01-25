const knex = require('../db/knex')
const DiskStorage = require('../providers/DiskStorage')

async function update(req, res) {
  const { id } = req.params
  const foodFileName = req.file.filename

  const diskStorage = new DiskStorage()

  const dish = await knex('dishes').where({ id }).first()

  if (dish.foodImg) {
    await diskStorage.deleteFile(dish.foodImg)
  }

  const file = await diskStorage.saveFile(foodFileName)
  dish.foodImg = file

  await knex('dishes').update(dish, { updated_at: knex.fn.now() }).where({ id })

  return res.status(201).json(file)
}

const DishImageController = {
  update,
}

module.exports = DishImageController
