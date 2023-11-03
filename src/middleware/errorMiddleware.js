import { AppError } from '../../errors/appError.js'

const errorMiddleware = (error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message })
  }

  return res.status(500).json({
    message: 'Internal server error',
  })
}

export default errorMiddleware
