// Import Express.
const express = require("express")

// Import the routes.
const routes = require('./controllers')

// Import the database connection details.
const sequelize = require("./config/connection")

// Declare the app and port.
const app = express()
const PORT = process.env.PORT || 3030

// Declare the middleware.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Use the routes.
app.use(routes)

// Connect to the database and listen at the specified port.
sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}! 🚀`))
  })
