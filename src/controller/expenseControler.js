import createExpenseService from '../service/expense/createExpense.service'

export const createExpenseController = async (req, res) => {
  const { userId, ...data } = req.validatedData

  const expense = await createExpenseService(data, userId)

  return res.status(201).json(expense)
}
