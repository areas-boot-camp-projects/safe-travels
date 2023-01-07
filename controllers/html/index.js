// Import the Express router.
const pageRouter = require("express").Router()

// Import JWT.
const jwt = require("jsonwebtoken")

// Declare the GET / route (get the home page).
pageRouter.get("/", (req, res) => {
  res.render("home")
})

// Declare the GET / route (get the home page).
pageRouter.get("/sign-in", (req, res) => {
  res.render("sign-in")
})

// Declare the GET /profile route (get the profile page).
pageRouter.get("/profile", async (req, res) => {
  try {
    // Verify the user’s token.
    const user = jwt.verify(req.cookies.jwt_session, process.env.JWT_SECRET)
    res.status(200).end()
  } catch (err) {
    console.log(err)
    res.status(401).send("Sorry, something’s wrong with your token. Try again.")
    return
  }
})

module.exports = pageRouter
