require('express-async-errors')

const AppError = require('./utils/appError')
const express = require('express')
const cors = require('cors')

const routes = require('./routes')

const app = express()
app.use(cors())
app.use(express.json())

app.use((error, req, res, next)=>{
  if(error instanceof AppError){
    return res.status(error.statusCode).json({
      status: error,
      message: error.message
    });
  }

  console.log(error)

  return res.status(500).json({
    status: "error",
    message: "Internal server error"
  })
})


app.use(routes)

const PORT = 3333

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
