import express from 'express'
import 'express-async-errors'
import appRoutes from './routes/index.js'
import errorMiddleware from './middleware/errorMiddleware.js'

export const app = express()
app.use(express.json())

appRoutes(app)
app.use(errorMiddleware)
