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

    if(password.length < 6) throw new AppError('Senha precisa ter mais de 6 caracteres.')
    const hashedPassword = await hash(password, 8)


    await knex("users").insert({
      name, 
      email, 
      password: hashedPassword
    })
    
    return res.status(201).json("Usuário cadastrado com sucesso!")
  }

  async update(req,res){
    const {email, name, password, old_password} = req.body
    const user_id = req.user.id

    const user = await knex('users').select('*').where({id: user_id}).first()

    if(!user) throw new AppError("Usuário não encontrado")

    const emailExists = await knex("users").where({email}).first()
    
    if(emailExists && emailExists.id !== user_id) throw new AppError('Esse email já está em uso')

    user.name = name ?? user.name
    user.email = email ?? user.name

    if(password && !old_password || !password && old_password) 
      throw new AppError("Você precisa informar as duas senhas para definir uma nova.")

      
      if(password && old_password){
        const checkPassword = await compare(old_password, user.password)
        
        if(!checkPassword) throw new AppError('Senha atual inválida')
        
        if(password.length < 6) throw new AppError('Senha precisa ter mais de 6 caracteres.')
        user.password = await hash(password, 8)
    }

    await knex("users")
    .select('*')
    .update({
      "email": email, 
      "name": name, 
      "password": user.password, 
      "updated_at": knex.fn.now()
    }).where({id: user_id})

    return res.json({user, test: "Cadastro alterado com sucesso!"})
  }

  async index(req, res){
    const users = await knex("users").select('*')
    if(!users) throw new AppError('Nenhum usuário encotrado na aplicação.')
    return res.json(users)
  }

}
  

module.exports = UserController


