import { AppError } from '../../../errors/appError.js'
import prismaClient from '../../database/prismaClient.js'

const updateExpenseService = async (data, id) => {
  const expense = await prismaClient.expense.findUnique({
    where: {
      id,
    },
  })

  if (!expense) {
    throw new AppError('No expense found', 404)
  }

  const updatedExpense = prismaClient.expense.update({
    where: {
      id,
    },
    data,
  })

  return updatedExpense
}

export default updateExpenseService
