// Import the Express router.
const router = require("express").Router()

// Import API routes.
const covidRoutes = require("./covidRoutes")

// Use the API routes.
router.use("/covid", covidRoutes)

module.exports = router
