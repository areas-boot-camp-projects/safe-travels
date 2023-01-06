// Import the Express router.
const { Router } = require("express")
const pageRouter = new Router()

pageRouter.get("/", (req, res)=>{
    res.render("home")
})

module.exports = pageRouter;
