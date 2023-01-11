const { verify } = require('jsonwebtoken')
const authConfig = require('../config/auth')
const AppError = require('../utils/appError')

function ensureAuth(req, res, next){
  const authHeader = req.headers.authorization

  const [, token] = authHeader.split(" ")

  try{
    const {sub: user_id} = verify(token, authConfig.jwt.secret)

    req.user = {
      id: Number(user_id)
    }

    return next()
    
  } catch {
    throw new AppError('Token inválido', 401)
  }
}