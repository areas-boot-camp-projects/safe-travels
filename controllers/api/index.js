// Import the Express router.
const apiRouter = require("express").Router()

// Import API routes.
const userRoutes = require("./userRoutes")
const userFavoriteRoutes = require("./userFavoriteRoutes")
const autocompleteRoutes = require("./autocompleteRoutes")
const covidDataRoutes = require("./covidDataRoutes")

// Use the API routes.
apiRouter.use("/user", userRoutes)
apiRouter.use("/user", userFavoriteRoutes)
apiRouter.use("/autocomplete", autocompleteRoutes)
apiRouter.use("/covid", covidDataRoutes)

module.exports = apiRouter
