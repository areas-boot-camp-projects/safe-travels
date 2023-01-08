// Import the Express router.
const userRouter = require("express").Router()

// Import the Sequelize operators.
const { Sequelize, Op } = require("sequelize")

// Import the User and UserFavorite models.
const { User, UserFavorite } = require("../../models")

// Import bcrypt and JWT.
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Get a user’s details and favorites and return them as an object.
async function getUser(userId) {
  try {
    // Query the database.
    let user = await User.findOne({
      attributes: [
        "user_id",
        "first_name",
        "last_name",
        "email",
      ],
      where: {
        "user_id": userId,
      },
      include: [{
        model: UserFavorite,
        required: false,
        attributes: [
          "favorite_city",
          "favorite_state",
        ],
        where: {
          "user_id": userId,
        },
      }],
    })
    // Convert the output to a plain JavaScript object.
    user = user.toJSON()
    // Rename “UserFavorites” to “favorites”.
    user = {
      ...user,
      favorites: user.UserFavorites,
      UserFavorites: undefined,
    }
    // Return the new object.
    return user
  } catch (err) {
    throw err
  }
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
    // Create a token with the user’s ID.
    let token = {
      user_id: user.user_id,
    }
    // Sign the token and set it to expire in 8 hours.
    token = jwt.sign(token, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 8 })
    // Create a cookie and set it to expire in 8 hours.
    res.cookie("jwt_session", token, { maxAge: 60 * 60 * 8 * 1000 })
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
      // Create a token with the user’s ID.
      let token = {
        user_id: user.user_id,
      }
      // Sign the token and set it to expire in 8 hours.
      token = jwt.sign(token, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 8 })
      // Create a cookie and set it to expire in 8 hours.
      res.cookie("jwt_session", token, { maxAge: 60 * 60 * 8 * 1000 })
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

// Declare the GET /api/user/:id/favorites routes (get a user’s favorites)
userRouter.get("/:id/favorites", async (req, res) => {
  try {
    // Return the user’s details and favorites.
    const allUserFavorites = await getUser(req.params.id)
    res.status(200).json(allUserFavorites)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Declare the POST /api/user/:id/favorites routes (add a user’s favorites)
userRouter.post("/:id/favorites", async (req, res) => {
  try {
    // Add new user’s favorites.
    const newUserFavorites = req.body.map((favorite) => {
      return {
        "user_id": req.params.id,
        "favorite_city": favorite.favorite_city,
        "favorite_state": favorite.favorite_state,
      }
    })
    await UserFavorite.bulkCreate(newUserFavorites)
    /// Return the user’s details and favorites.
    const allUserFavorites = await getUser(req.params.id)
    res.status(200).json(allUserFavorites)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Declare the DELELTE /api/user/:id/favorites routes (delete a user’s favorites)
userRouter.delete("/:id/favorites", async (req, res) => {
  try {
    // Delete a user’s favorites.
    const deleteUserFavorites = req.body.map((favorite) => {
      return {
        "user_id": req.params.id,
        "favorite_city": favorite.favorite_city,
        "favorite_state": favorite.favorite_state,
      }
    })
    await UserFavorite.destroy({
      where: {
        [Sequelize.Op.or]: deleteUserFavorites
      }
    })
    // Return the user’s details and favorites.
    const allUserFavorites = await getUser(req.params.id)
    res.status(200).json(allUserFavorites)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = userRouter
