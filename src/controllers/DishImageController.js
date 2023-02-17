const knex = require('../db/knex');
const AppError = require('../utils/appError');
const DiskStorage = require('../providers/DiskStorage');

class DishImageController {
  async update(req, res) {
    const { id } = req.params;
    const foodFileName = req.file.filename;

    const diskStorage = new DiskStorage();

    const dish = await knex('dishes').where({ id }).first();

    if (dish.foodImg) {
      await diskStorage.deleteFile(dish.foodImg);
    }

    const file = await diskStorage.saveFile(foodFileName);
    dish.foodImg = file;

    await knex('dishes').update(dish, { updated_at: knex.fn.now() }).where({ id });

    return res.json(file);
  }
}

module.exports = DishImageController;
