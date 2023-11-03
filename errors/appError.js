export class AppError extends Error {
  constructor(message, statusCode = 400) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}
