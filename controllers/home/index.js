// Import the Express router.
const { Router } = require("express")
 
// Import the HTML and API routes.

const pageRouter = new Router()

pageRouter.get("/", (req, res)=>{
    res.render("home")
})
// const apiRoutes = require("../api")
// const homeRoutes = require(".")

// Use the HTML and API routes.
// router.use('/', homeRoutes);
// router.use('/api', apiRoutes);

module.exports = pageRouter;
