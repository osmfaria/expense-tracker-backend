import createExpenseService from '../service/expense/createExpense.service'
import deleteExpenseService from '../service/expense/deleteExpense.service'
import listExpenseService from '../service/expense/listExpense.service'
import listExpenseByWeekService from '../service/expense/listExpenseByWeek.service'
import ListYearsWithExpenseService from '../service/expense/listYearsWithExpense.service'
import updateExpenseService from '../service/expense/updateExpense.service'

export const createExpenseController = async (req, res) => {
  const { userId, ...data } = req.validatedData

  const expense = await createExpenseService(data, userId)

  return res.status(201).json(expense)
}

export const updateExpenseController = async (req, res) => {
  const { data } = req.validatedData
  const { expense_id } = req.params

  const expense = await updateExpenseService(data, expense_id)

  return res.status(200).json(expense)
}

export const deleteExpenseController = async (req, res) => {
  const { expense_id } = req.params

  await deleteExpenseService(expense_id)

  return res.status(204).send()
}

export const listExpenseController = async (req, res) => {
  const { user_id, year } = req.params

  const expense = await listExpenseService(user_id, year)

  return res.status(200).json(expense)
}

export const listExpenseByWeekController = async (req, res) => {
  const { user_id, year } = req.params

  const expenses = await listExpenseByWeekService(user_id, year)

  return res.status(200).json(expenses)
}

export const ListYearsWithExpenseController = async (req, res) => {
  const { user_id } = req.params

  const expenses = await ListYearsWithExpenseService(user_id)

  return res.status(200).json(expenses)
}
