import express from 'express'
import appRoutes from './routes/index.js'
import errorMiddleware from './middleware/errorMiddleware.js'

const app = express()
app.use(express.json())

appRoutes(app)

app.use(errorMiddleware)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🌎 server running ${PORT}`)
})
