import { Router } from 'express'
import { validate } from '../middleware/validationMiddleware'
import { expenseCreateSchema } from '../schema/expenseSchema'
import { createExpenseController } from '../controller/expenseControler'

const expenseRoute = Router()

expenseRoute.post('', validate(expenseCreateSchema), createExpenseController)

export default expenseRoute
