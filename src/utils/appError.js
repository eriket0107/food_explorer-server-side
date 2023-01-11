class AppError{
  message;
  statusCode;
  constructor(statusCode = 400, message){
    this.message = message
    this.statusCode = statusCode
  }
}

module.exports = AppError;