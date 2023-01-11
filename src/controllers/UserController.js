const knex = require('../db/knex')
const AppError = require('../utils/appError')
const {hash, compare} = require('bcrypt')

class UserController{
  async create(req, res){
    const {name, email, password} = req.body

    if(!name || !email || !password) {
      throw new AppError("Existem campos vazios, por favor preencha todos.")
    }

    const checkEmailExists = await knex("users").where({email}).first()

    if(checkEmailExists) return res.json('Email já cadastrado.')

    const hashedPassword = await hash(password, 8)

    await knex("users").insert({
      name, 
      email, 
      password: hashedPassword
    })
    
    return res.json({name, email, password: hashedPassword})
  }

  async update(req,res){
    
  }
}

module.exports = UserController