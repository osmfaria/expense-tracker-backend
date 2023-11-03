import { Router } from 'express'
import {
  createUserController,
  listUsersController,
} from '../controller/userController.js'
import { validate } from '../middleware/validationMiddleware.js'
import { userCreateSchema } from '../schema/userSchema.js'

const userRouter = Router()

userRouter.post('', validate(userCreateSchema), createUserController)
userRouter.get('', listUsersController)

export default userRouter
