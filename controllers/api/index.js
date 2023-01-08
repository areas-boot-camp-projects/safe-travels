// Import the Express router.
const apiRouter = require("express").Router()

// Import API routes.
const userRoutes = require("./userRoutes")
const userFavoriteRoutes = require("./userFavoriteRoutes")
const covidRoutes = require("./covidRoutes")

// Use the API routes.
apiRouter.use("/user", userRoutes)
apiRouter.use("/user", userFavoriteRoutes)
apiRouter.use("/covid", covidRoutes)

module.exports = apiRouter
