// Import the Express router and Sequelize operators.
const router = require("express").Router()
const { Sequelize, Op } = require("sequelize")

// Import the User and UserFavorite models.
const { User, UserFavorite } = require("../../models")

// Get a user’s details and return them as an object.
async function getUserDetails(userId) {
  try {
    const user = await User.findOne({
      attributes: [
        "user_id",
        "first_name",
        "last_name",
        "email",
      ],
      include: [{
        model: UserFavorite,
        as: "favorites",
        attributes: ["favorite"],
        required: false,
        through: { attributes: [] }
      }],
      where: {
        "user_id": userId,
      },
    })
  } catch (err) {
    throw err
  }
}

// Get a user’s details and return them as an object.
async function getUser(userId) {
  try {
    const user = await User.findOne({
      attributes: [
        "user_id",
        "first_name",
        "last_name",
        "email",
      ],
      where: {
        "user_id": userId,
      },
    })
    return user
  } catch (err) {
    throw err
  }
}

// Get a user’s favorites and return them as an array.
async function getAllUserFavorites(userId) {
  try {
    const allUserFavorites = await UserFavorite.findAll({
      attributes: [
        "favorite_city",
        "favorite_state",
      ],
      where: {
        "user_id": userId,
      },
    })
    return allUserFavorites
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
    const user = await getUser(req.params.id)
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
    const user = await getUser(newUser.user_id)
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Declare GET /api/users/:id/favorites (get a user’s favorites)
router.get("/:id/favorites", async (req, res) => {
  try {
    // Return all user’s favorites.
    const allUserFavorites = await getAllUserFavorites(req.params.id)
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
    const allUserFavorites = await getAllUserFavorites(req.params.id)
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
    const allUserFavorites = await getAllUserFavorites(req.params.id)
    res.status(200).json(allUserFavorites)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router

// Questions/todos/nice-to-haves:
// - For POST /api/users/, do we need to return the password?
// - Investigate if it would be good to create docs using swagger-jsdoc (code-first approach), or swagger-codegen or openapi-generator (design-first approach). **
// - Add if/else statements to catch other errors, such as 400 and 404 (not just 500).
