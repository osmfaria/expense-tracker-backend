import { AppError } from '../../../errors/appError.js'
import prismaClient from '../../database/prismaClient.js'

const deleteExpenseService = async (expense_id) => {
  const expense = await prismaClient.expense.findUnique({
    where: {
      id: expense_id,
    },
  })

  if (!expense) {
    throw new AppError('Expense not found', 404)
  }

  await prismaClient.expense.delete({
    where: {
      id: expense_id,
    },
  })
}

export default deleteExpenseService
