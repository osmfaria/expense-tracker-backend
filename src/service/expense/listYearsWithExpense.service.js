import { AppError } from '../../../errors/appError.js'
import prismaClient from '../../database/prismaClient.js'

const ListYearsWithExpenseService = async (user_id) => {
  const user = await prismaClient.user.findUnique({
    where: {
      id: user_id,
    },
  })

  if (!user) {
    throw new AppError('User not found', 404)
  }

  const expense = await prismaClient.$queryRaw`
  SELECT EXTRACT(YEAR FROM date) as year,
    SUM(amount) as total_amount
  FROM 
    public."Expense"
  WHERE 
    public."Expense"."userId" = ${user_id}
  GROUP BY 
    year
  ORDER BY 
    year DESC;
  `
  return expense
}

export default ListYearsWithExpenseService
