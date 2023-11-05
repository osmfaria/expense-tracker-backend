import { Router } from 'express'
import { validate } from '../middleware/validationMiddleware'
import {
  expenseCreateSchema,
  expenseUpdateSchema,
} from '../schema/expenseSchema'
import {
  createExpenseController,
  deleteExpenseController,
  listExpenseByWeekController,
  listExpenseController,
  updateExpenseController,
} from '../controller/expenseControler'

const expenseRoute = Router()

expenseRoute.post('', validate(expenseCreateSchema), createExpenseController)
expenseRoute.patch('', validate(expenseUpdateSchema), updateExpenseController)
expenseRoute.delete('/:expense_id', deleteExpenseController)
expenseRoute.get('/:user_id/:year', listExpenseController)
expenseRoute.get('/week/:user_id/:year', listExpenseByWeekController)

export default expenseRoute
