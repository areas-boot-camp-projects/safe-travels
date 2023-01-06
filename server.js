// Project requirements: https://courses.bootcampspot.com/courses/2188/assignments/38679?module_item_id=749071.

// Import Express, Express Handlebars, and Cookie Parser.
const express = require("express")
const handlebars = require("express-handlebars")
const cookieParser = require("cookie-parser")

// Import the routes.
const routes = require("./controllers")

// // Import the database connection details.
const sequelize = require("./config/connection")

// Declare the app and port.
const app = express()
const PORT = process.env.PORT || 3030

// Set up Handlebars and tell Express to use the its template engine.
const hbs = handlebars.create()
app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")

// // Declare the middleware.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// // Use the routes.
app.use(routes)

// Connect to the database and listen at the specified port.
sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}! 🚀`))
  })
