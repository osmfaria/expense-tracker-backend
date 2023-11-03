import { AppError } from '../../errors/appError.js'

export const validate = (schema) => async (req, res, next) => {
  try {
    const validatedData = await schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    })

    req.validatedData = validatedData

    next()
  } catch (err) {
    next(new AppError(err.errors, err.statusCode))
  }
}
