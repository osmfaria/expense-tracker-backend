import prismaClient from '../../database/prismaClient.js'

const listExpenseByWeekService = async (user_id, year) => {
  const user = await prismaClient.user.findUnique({
    where: {
      id: user_id,
    },
  })

  if (!user) {
    throw new AppError('User not found', 404)
  }

  const expense = await prismaClient.$queryRaw`
  SELECT DATE_TRUNC('week', date) as week,
    EXTRACT(WEEK FROM date) as week_number,
    EXTRACT(YEAR FROM date) as year,
    SUM(amount) as total_amount
  FROM 
    public."Expense"
  WHERE 
    public."Expense"."userId" = ${user_id}
    AND EXTRACT(YEAR FROM date) = ${year}::integer
  GROUP BY 
    week, week_number, year
  ORDER BY 
    week DESC;
  `

  return expense
}

export default listExpenseByWeekService
