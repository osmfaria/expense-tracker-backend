import { Router } from 'express'
import { validate } from '../middleware/validationMiddleware'
import {
  deleteUpdateSchema,
  expenseCreateSchema,
  expenseUpdateSchema,
} from '../schema/expenseSchema'
import {
  createExpenseController,
  deleteExpenseController,
  updateExpenseController,
} from '../controller/expenseControler'

const expenseRoute = Router()

expenseRoute.post('', validate(expenseCreateSchema), createExpenseController)
expenseRoute.patch('', validate(expenseUpdateSchema), updateExpenseController)
expenseRoute.delete('/:expense_id', deleteExpenseController)

export default expenseRoute
