import prismaClient from '../../database/prismaClient'

const createExpenseService = async (data, userId) => {
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
