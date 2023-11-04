import expenseRoute from './expenseRoutes.js'
import userRouter from './userRoutes.js'

const appRoutes = (app) => {
  app.use('/users', userRouter)
  app.use('/expenses', expenseRoute)
}

export default appRoutes
