import prismaClient from '../../database/prismaClient.js'

const listExpenseService = async (user_id, year) => {
  const expenses = await prismaClient.expense.findMany({
    where: {
      userId: user_id,
      date: {
        gte: new Date(`${year}-01-01`),
        lte: new Date(`${year}-12-31`),
      },
    },
    orderBy: {
      date: 'desc',
    },
  })

  return expenses
}

export default listExpenseService
