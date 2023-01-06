// Import the Express router.
const mainRouter = require("express").Router()

// Import the HTML and API routes.
const apiRoutes = require("./api")
const htmlRoutes = require("./html")

// Use the HTML and API routes.
mainRouter.use('/', htmlRoutes);
mainRouter.use('/api', apiRoutes);

module.exports = mainRouter
