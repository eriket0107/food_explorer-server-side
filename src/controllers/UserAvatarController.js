const knex = require('../db/knex')
const AppError = require('../utils/appError')
const DiskStorage = require("../providers/DiskStorage")

class UserAvatarController{
  async update(req, res){
    const user_id = req.user.id
    const avatarFileName = req.file.filename

    const diskStorage = new DiskStorage()

    const user = await knex("users").where({id: user_id}).first()

    if(!user){
      throw new AppError('Somente usuários autenticados podem mudar o avatar', 401)
    }

    if(user.avatar){
      await diskStorage.deleteFile(user.avatar)
    }

    const file = await diskStorage.saveFile(avatarFileName)
    user.avatar = file

    await knex('users').update(user, {"updated_at": knex.fn.now()}).where({id: user_id})

    return res.json(user.avatar)
  }
}

module.exports = UserAvatarController