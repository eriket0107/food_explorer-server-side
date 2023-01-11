const { Router } = require('express')

const userRoutes = Router()

userRoutes.get('/users', (req, res)=> res.json('Users'))

module.exports = userRoutes