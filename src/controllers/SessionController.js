const knex = require('../db/knex')
const { compare } = require('bcrypt')
const { sign } = require('jsonwebtoken')
const authConfig = require('../config/auth')
const AppError = require('../utils/appError')

class SessionController {
  async create(req, res) {
    const { email, password } = req.body

    const user = await knex('users').select('*').where({ email }).first()

    if (!user) throw new AppError('E-mail e/ou senha incorreta', 401)

    const checkPassword = await compare(password, user.password)

    if (!checkPassword) throw new AppError('E-mail e/ou senha incorreta', 401)

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    })

    res.cookie('token', token, { httpOnly: true })

    return res
      .status(201)
      .json({ user: { name: user.name, email: user.email } })
  }
}

module.exports = SessionController
