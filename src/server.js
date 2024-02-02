require('dotenv/config')
require('express-async-errors')

const cors = require('cors')
const express = require('express')
const cookieParser = require('cookie-parser')
const AppError = require('./utils/appError')

const uploadConfig = require('./config/upload')

const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/files', express.static(uploadConfig.UPLOAD_FOLDER))

app.use(routes)

app.use((error, req, res) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }

  console.log(error)

  return res.status(500).json({
    status: 'error',
    message: 'Internal server',
  })
})

const PORT = process.env.SERVER_PORT || 3333

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
