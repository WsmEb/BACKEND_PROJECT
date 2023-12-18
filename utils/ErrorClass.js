class AppError extends Error {
  constructor() {
    super()

  };

  create (message,code,status) {
    this.message = message
    this.code = code
    this.status = status
  }

}

module.exports =  new AppError()

