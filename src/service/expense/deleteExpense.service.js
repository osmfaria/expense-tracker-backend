import prismaClient from '../../database/prismaClient'

const deleteExpenseService = async (expense_id) => {
  await prismaClient.expense.delete({
    where: {
      id: expense_id,
    },
  })
}

export default deleteExpenseService
