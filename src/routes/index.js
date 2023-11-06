import expenseRoute from './expenseRoutes.js'
import userRouter from './userRoutes.js'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'
// import swaggerDocs from '../../swagger.json' assert { type: 'json' }

const loadJSON = (path) =>
  JSON.parse(fs.readFileSync(new URL(path, import.meta.url)))

const swaggerDocs = loadJSON('../../swagger.json')

const appRoutes = (app) => {
  app.use('/users', userRouter)
  app.use('/expenses', expenseRoute)
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

export default appRoutes
