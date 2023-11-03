import { app } from './app'
;(() => {
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log(`🌎 Server running on port ${PORT}`) // Fixed to use console.log for output
  })
})()
