const { verify } = require('jsonwebtoken')
const authConfig = require('../config/auth')
const AppError = require('../utils/appError')

function ensureAuth(req, res, next) {
  const { sessionToken } = req.cookies.token

  if (req.cookies && req.cookies.token) {
    try {
      const { sub, role } = verify(sessionToken, authConfig.jwt.secret)
      const token = JSON.parse(sub)

      req.user = {
        id: token.userId,
        role,
      }

      return next()
    } catch {
      throw new AppError('Token inválido', 401)
    }
  } else res.status(403).send('Forbidden')
}

module.exports = ensureAuth
