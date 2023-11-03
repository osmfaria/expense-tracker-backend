import userRouter from './userRoutes.js'

const appRoutes = (app) => {
  app.use('/users', userRouter)
}

export default appRoutes
