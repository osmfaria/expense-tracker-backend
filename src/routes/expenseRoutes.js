import { Router } from 'express'
import { validate } from '../middleware/validationMiddleware.js'
import {
  expenseCreateSchema,
  expenseUpdateSchema,
} from '../schema/expenseSchema.js'
import {
  ListYearsWithExpenseController,
  createExpenseController,
  deleteExpenseController,
  listExpenseByWeekController,
  listExpenseController,
  updateExpenseController,
} from '../controller/expenseControler.js'

const expenseRoute = Router()

expenseRoute.post('', validate(expenseCreateSchema), createExpenseController)
expenseRoute.patch(
  '/:expense_id',
  validate(expenseUpdateSchema),
  updateExpenseController
)
expenseRoute.delete('/:expense_id', deleteExpenseController)
expenseRoute.get('/:user_id/recorded-years', ListYearsWithExpenseController)
expenseRoute.get('/:user_id/:year', listExpenseController)
expenseRoute.get('/week/:user_id/:year', listExpenseByWeekController)

export default expenseRoute
