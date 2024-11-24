const { CustomAPIError } = require('../errors/custom-error')

const errorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = err.status || 500
  const message = err.message || 'Something went wrong! (error-handler.js)'

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }

  console.error(err)
  return res.status(statusCode).json({ msg: message })
}

module.exports = errorHandlerMiddleware
