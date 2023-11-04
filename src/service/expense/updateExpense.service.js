import prismaClient from '../../database/prismaClient'

const updateExpenseService = async (data, id) => {
  const service = prismaClient.expense.update({
    where: {
      id,
    },
    data,
  })

  return service
}

export default updateExpenseService
