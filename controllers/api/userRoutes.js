// Import the Express router and Sequelize operators.
const router = require("express").Router()
const { Sequelize, Op } = require("sequelize")

// Import the User and UserFavorite models.
const { User, UserFavorite } = require("../../models")

// Get a user’s details and favorites, and return them as an object.
async function getUserDetailsAndFavorites(userId) {
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
    // Convert the results to a plain JavaScript object.
    user = user.toJSON()
    // Rename UserFavorites to favorites.
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

// Declare the GET /api/users route (get all users).
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: [
        "user_id",
        "first_name",
        "last_name",
        "email",
      ],
    })
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Declare GET /api/users/:id route (get a user).
router.get("/:id", async (req, res) => {
  try {
    // Return the user’s details.
    const user = await getUserDetailsAndFavorites(req.params.id)
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Declare POST /api/users (add a user).
router.post("/", async (req, res) => {
  try {
    // Add a user.
    const newUser = await User.create(req.body)
    // Return the user’s details.
    const user = await getUserDetailsAndFavorites(newUser.user_id)
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Declare POST /api/users/signin (sign in a user).
router.post("/signin", async (req, res) => {
  try {
    // Search for the user by their email.
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    })
    // If not found, return an error message.
    if (!user) {
      res.status(400).json({ message: "Can’t find a user with that email. Try again." })
      return
    }
    // Verify the user’s password.
    const validPassword = await user.verifyPassword(req.body.password)
    // If the passwords don’t match, return an error message.
    if (!validPassword) {
      res.status(400).json({ message: "Password’s incorrect. Try again." })
    }
    // ** todo: Add logic to sign a user in.
    
  } catch (err) {
    res.status(400).json(err)
  }
})

// Declare GET /api/users/:id/favorites (get a user’s favorites)
router.get("/:id/favorites", async (req, res) => {
  try {
    // Return all user’s favorites.
    const allUserFavorites = await getUserDetailsAndFavorites(req.params.id)
    res.status(200).json(allUserFavorites)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Declare POST /api/users/:id/favorites (add a user’s favorites)
router.post("/:id/favorites", async (req, res) => {
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
    // Return all user’s favorites.
    const allUserFavorites = await getUserDetailsAndFavorites(req.params.id)
    res.status(200).json(allUserFavorites)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Declare DELELTE /api/users/:id/favorites (delete a user’s favorites)
router.delete("/:id/favorites", async (req, res) => {
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
    // Return all user’s favorites.
    const allUserFavorites = await getUserDetailsAndFavorites(req.params.id)
    res.status(200).json(allUserFavorites)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
