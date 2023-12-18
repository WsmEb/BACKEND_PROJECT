const AppError = require("./ErrorClass")

const manageError = (status="error",message="Error Happend",code=500) => {
  return (req,res,next) =>  {

    const error = AppError.create(message,code,status)
    return next(error)
    
  }
}

module.exports = manageError;