import prismaClient from '../../database/prismaClient.js'
import { AppError } from '../../../errors/appError.js'

const createExpenseService = async (data, userId) => {
  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    throw new AppError('User not found', 404)
  }

  const expense = await prismaClient.expense.create({
    data: {
      ...data,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  })

  return expense
}

export default createExpenseService
