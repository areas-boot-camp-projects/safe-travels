// Import the Express router and Sequelize operators.
const pageRouter = require("express").Router()

// Import JWT.
const jwt = require("jsonwebtoken")

// Import the getUser() util function.
const getUser = require("../../utils/getUser")

// Get a user’s token from their cookie.
function getToken(cookie) {
  let token
  if (cookie && cookie.startsWith("jwt_session=")) {
    token = cookie.replace("jwt_session=", "")
  }
  return token
}

// Declare the GET / route (render the home page).
pageRouter.get("/", async (req, res) => {
  try {
    const token = await getToken(req.headers.cookie)
    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      const user = await getUser(decodedToken.user_id)
      res.render("home", {
        token: token,
        user: user,
      })
    } else {
      res.render("home", {
        token: token,
      })
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

// Declare the GET /sign-up route (render the sign up page).
pageRouter.get("/sign-up", async (req, res) => {
  try {
    const token = await getToken(req.headers.cookie)
    if (!token) {
      res.render("sign-up", { token: token })
    } else if (token) {
      res.redirect("/")
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

// Declare the GET /sign-in route (render the sign in page).
pageRouter.get("/sign-in", async (req, res) => {
  try {
    const token = getToken(req.headers.cookie)
    if (!token) {
      res.render("sign-in", { token: token })
    } else if (token) {
      res.redirect("/")
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = pageRouter
