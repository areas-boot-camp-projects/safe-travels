// Import the Express router.
const pageRouter = require("express").Router()

// Import JWT.
const jwt = require("jsonwebtoken")

// Get a user’s token and evaluate whether it’s present (true) or not (false).
function getToken(cookie) {
  let token = cookie
  if (token === "jwt_session=") {
    token = false
  }
  return token
}

// Declare the GET / route (get the home page).
pageRouter.get("/", (req, res) => {
  const token = getToken(req.headers.cookie)
  res.render("home", { token: token })
})

// Declare the GET /sign-up route (get the home page).
pageRouter.get("/sign-up", (req, res) => {
  const token = getToken(req.headers.cookie)
  if (!token) {
    res.render("sign-up", { token: token })
  } else if (token) {
    res.redirect("/")
  }
})

// Declare the GET /sign-in route (get the home page).
pageRouter.get("/sign-in", (req, res) => {
  const token = getToken(req.headers.cookie)
  if (!token) {
    res.render("sign-in", { token: token })
  } else if (token) {
    res.redirect("/")
  }
})

module.exports = pageRouter

// // Declare the GET /profile route (get the profile page).
// pageRouter.get("/profile", async (req, res) => {
//   try {
//     // Verify the user’s token.
//     const user = jwt.verify(req.cookies.jwt_session, process.env.JWT_SECRET)
//     res.status(200).end()
//   } catch (err) {
//     console.log(err)
//     res.status(401).send("Sorry, something’s wrong with your token. Try again.")
//     return
//   }
// })
