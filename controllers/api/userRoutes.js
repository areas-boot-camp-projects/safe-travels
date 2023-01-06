// Import the Express router.
const router = require("express").Router()

// Import the Sequelize operators.
const { Sequelize, Op } = require("sequelize")

// Import the User and UserFavorite models.
const { User, UserFavorite } = require("../../models")

// Import bcrypt.
const bcrypt = require("bcrypt")

// Get a user’s details and favorites, and return them as an object.
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

// Declare the GET /api/users route (get all users).
router.get("/", async (req, res) => {
  try {
    let users = await User.findAll({
      attributes: [
        "user_id",
        "first_name",
        "last_name",
        "email",
      ],
      include: [{
        model: UserFavorite,
        required: false,
        attributes: [
          "favorite_city",
          "favorite_state",
        ],
      }],
    })
    // ** todo: Add code to convert users to an array of plain objects, and rename UserFavorites to favorites.
    // Return the new object.
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Declare the GET /api/users/:id route (get a user).
router.get("/:id", async (req, res) => {
  try {
    // Return the user’s details and favorites.
    const user = await getUser(req.params.id)
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Declare the POST /api/users route (add a user).
router.post("/", async (req, res) => {
  try {
    // Add a user.
    const newUser = await User.create(req.body)
    // Return the user’s details and favorites.
    const user = await getUser(newUser.user_id)
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Declare the POST /api/users/login route (log in a user).
router.post("/login", async (req, res) => {
  try {
    // Search for the user by their email address.
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    })
    // If not found, return an error message.
    if (!user) {
      res.status(401).send("Sorry, your email or password is incorrect. Try again.")
      return
    }
    // Validate the user’s password.
    const validPassword = await bcrypt.compareSync(req.body.password, user.password)
    // If the passwords don’t match, return an error message.
    if (!validPassword) {
      res.status(401).send("Sorry, your email or password is incorrect. Try again.")
    }
    
    // ** todo: Add logic to log in a user.
    if (validPassword) {
      res.status(200).send("Great, you made it this far!")
    }

  } catch (err) {
    res.status(500).json(err)
  }
})

// Declare the GET /api/users/:id/favorites routes (get a user’s favorites)
router.get("/:id/favorites", async (req, res) => {
  try {
    // Return the user’s details and favorites.
    const allUserFavorites = await getUser(req.params.id)
    res.status(200).json(allUserFavorites)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Declare the POST /api/users/:id/favorites routes (add a user’s favorites)
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
    /// Return the user’s details and favorites.
    const allUserFavorites = await getUser(req.params.id)
    res.status(200).json(allUserFavorites)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Declare the DELELTE /api/users/:id/favorites routes (delete a user’s favorites)
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
    // Return the user’s details and favorites.
    const allUserFavorites = await getUser(req.params.id)
    res.status(200).json(allUserFavorites)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
