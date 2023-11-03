import { Router } from 'express'
import { createUserController } from '../controller/userController.js'
import { validate } from '../middleware/validationMiddleware.js'
import { userCreateSchema } from '../schema/userSchema.js'

const userRouter = Router()

userRouter.post('', validate(userCreateSchema), createUserController)

export default userRouter
