import expenseRoute from './expenseRoutes.js'
import userRouter from './userRoutes.js'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from '../../swagger.json'

const appRoutes = (app) => {
  app.use('/users', userRouter)
  app.use('/expenses', expenseRoute)
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

export default appRoutes
