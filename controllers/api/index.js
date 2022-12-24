// Import the Express router.
const router = require("express").Router()

// Import API routes.
const covidRoutes = require("./covidRoutes")
const userRoutes = require("./userRoutes")

// Use the API routes.
router.use("/covid", covidRoutes)
router.use("/users", userRoutes)

module.exports = router
