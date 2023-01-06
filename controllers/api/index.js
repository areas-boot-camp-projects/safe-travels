// Import the Express router.
const apiRouter = require("express").Router()

// Import API routes.
const covidRoutes = require("./covidRoutes")
const userRoutes = require("./userRoutes")

// Use the API routes.
apiRouter.use("/covid", covidRoutes)
apiRouter.use("/user", userRoutes)

module.exports = apiRouter
