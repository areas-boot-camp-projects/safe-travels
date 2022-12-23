// Import the Express router.
const router = require("express").Router()

// Import the HTML and API routes.
const apiRoutes = require("./api")
const homeRoutes = require("./home")

// Use the HTML and API routes.
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router
