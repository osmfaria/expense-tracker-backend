import { Router } from 'express'
import { validate } from '../middleware/validationMiddleware'
import {
  expenseCreateSchema,
  expenseUpdateSchema,
} from '../schema/expenseSchema'
import {
  createExpenseController,
  updateExpenseController,
} from '../controller/expenseControler'

const expenseRoute = Router()

expenseRoute.post('', validate(expenseCreateSchema), createExpenseController)
expenseRoute.patch('', validate(expenseUpdateSchema), updateExpenseController)

export default expenseRoute
