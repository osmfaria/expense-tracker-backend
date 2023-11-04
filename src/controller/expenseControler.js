import createExpenseService from '../service/expense/createExpense.service'
import updateExpenseService from '../service/expense/updateExpense.service'

export const createExpenseController = async (req, res) => {
  const { userId, ...data } = req.validatedData

  const expense = await createExpenseService(data, userId)

  return res.status(201).json(expense)
}

export const updateExpenseController = async (req, res) => {
  const { id, ...data } = req.validatedData

  const expense = await updateExpenseService(data, id)

  return res.status(200).json(expense)
}
