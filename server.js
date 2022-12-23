// Import Express.
const express = require("express")

// Import database connection details.
const sequelize = require("./config/connection")

// Declare the app and port.
const app = express()
const PORT = process.env.PORT || 3333

// Connect to the database and listen at the specified port.
sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}.`))
  })
