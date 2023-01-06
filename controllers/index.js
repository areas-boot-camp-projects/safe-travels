// Import the Express router.
const router = require("express").Router()

// Import the HTML and API routes.
const apiRoutes = require("./api")
const htmlRoutes = require("./html")

// Use the HTML and API routes.
router.use('/', htmlRoutes);
router.use('/api', apiRoutes);

module.exports = router
