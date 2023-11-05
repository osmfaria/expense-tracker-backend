import prismaClient from '../../database/prismaClient'

const ListYearsWithExpenseService = async (user_id) => {
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
