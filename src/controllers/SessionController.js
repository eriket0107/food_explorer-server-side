const knex = require('../db/knex')
const { compare } = require('bcrypt')
const { sign } = require('jsonwebtoken')
const authConfig = require('../config/auth')
const AppError = require('../utils/appError')

async function create(req, res) {
  const { email, password } = req.body

  const user = await knex('users').select('*').where({ email }).first()

  if (!user) throw new AppError('E-mail e/ou senha incorreta', 401)

  const checkPassword = await compare(password, user.password)

  if (!checkPassword) throw new AppError('E-mail e/ou senha incorreta', 401)

  const { secret, expiresIn } = authConfig.jwt

  const sessionToken = sign({ role: user.role }, secret, {
    subject: JSON.stringify({
      userId: user.id,
    }),
    expiresIn,
  })

  res.cookie(
    'token',
    { sessionToken },
    { httpOnly: true, maxAge: 60 * 60 * 24 },
  )

  return res.status(201).json({ user: { name: user.name, email: user.email } })
}

const SessionController = {
  create,
}

module.exports = SessionController
