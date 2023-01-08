// Import the Express router and Sequelize operators.
const userRouter = require("express").Router()
const { Sequelize, Op } = require("sequelize")

// Import the User and UserFavorite models.
const { User } = require("../../models")

// Import bcrypt and JWT.
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Import the getUser() util function.
const getUser = require("../../utils/getUser")

// Create a token and cookie.
function createTokenAndCookie(userId, res) {
  // Create a token with the user’s ID.
  let token = {
    user_id: userId,
  }
  // Sign the token and set it to expire in 8 hours.
  token = jwt.sign(token, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 8 })
  // Create a cookie and set it to expire in 8 hours.
  res.cookie("jwt_session", token, { maxAge: 60 * 60 * 8 * 1000 })
}

// Declare the GET /api/user/:id route (get a user).
userRouter.get("/:id", async (req, res) => {
  try {
    // Return the user’s details and favorites.
    const user = await getUser(req.params.id)
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Declare the POST /api/user route (add a user).
userRouter.post("/", async (req, res) => {
  try {
    // Add a user.
    const newUser = await User.create(req.body)
    // Return the user’s details and favorites.
    const user = await getUser(newUser.user_id)
    // Create a token and cookie.
    createTokenAndCookie(user.user_id, res)
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Declare the POST /api/user/sign-in route (sign in a user).
userRouter.post("/sign-in", async (req, res) => {
  try {
    // Search for the user by their email address.
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    })
    // If there’s no match, return an error message.
    if (!user) {
      res.status(401).send("Sorry, your email or password is incorrect. Try again.")
      return
    }
    // Validate the user’s password.
    const validPassword = await bcrypt.compareSync(req.body.password, user.password)
    // If there’s no match, return an error message. Else, create a token.
    if (!validPassword) {
      res.status(401).send("Sorry, your email or password is incorrect. Try again.")
      return
    } else if (validPassword) {
      // Create a token and cookie.
      createTokenAndCookie(user.user_id, res)
      res.status(200).end()
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

// Declare the POST /api/user/sign-out route (sign out a user).
userRouter.post("'/sign-out", function(req, res) {
  res.clearCookie("jwt_session", "", { expires: new Date(0) })
  res.redirect("/")
})

module.exports = userRouter
