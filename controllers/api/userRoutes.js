// Import the Express router.
const router = require("express").Router()

const { default: test } = require("node:test")
// Import Sequelize operators.
const { Op, Sequelize } = require("sequelize")

// Import the User and UserFavorite model.
const { User, UserFavorite } = require("../../models")

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
    const user = await User.findOne({
      attributes: [
        "user_id",
        "first_name",
        "last_name",
        "email",
      ],
      where: {
        "user_id": req.params.id,
      },
    })
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Declare POST /api/users (add a user).
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Declare GET /api/users/:id/favorites (get a user’s favorites)
router.get("/:id/favorites", async (req, res) => {
  try {
    // ** if possible, move this outside the route and make it available to all the favorites routes.
    const allUserFavoritesObjects = await UserFavorite.findAll({
      attributes: [
        "favorite",
      ],
      where: {
        "user_id": req.params.id,
      },
    })
    const allUserFavoritesArray = allUserFavoritesObjects.map(favorite => favorite.favorite)    
    res.status(200).json(allUserFavoritesArray)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Declare POST /api/users/:id/favorites (add a user’s favorites)
router.post("/:id/favorites", async (req, res) => {
  try {
    // 
    const newUserFavoritesObjects = []
    req.body.forEach((favorite) => {
      newUserFavoritesObjects.push({
        user_id: req.params.id,
        favorite: favorite,
      })
    })
    await UserFavorite.bulkCreate(newUserFavoritesObjects)
    // ** if possible, move this outside the route and make it available to all the favorites routes.
    const allUserFavoritesObjects = await UserFavorite.findAll({
      attributes: [
        "favorite",
      ],
      where: {
        "user_id": req.params.id,
      },
    })
    const allUserFavoritesArray = allUserFavoritesObjects.map(favorite => favorite.favorite)    
    res.status(200).json(allUserFavoritesArray)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Declare DELELTE /api/users/:id/favorites (delete a user’s favorites)
router.delete("/:id/favorites", async (req, res) => {
  try {
    await UserFavorite.destroy({
      where: {
        "user_id": req.params.id,
        "favorite": { [Op.in]: req.body },
      },
    })
    // ** if possible, move this outside the route and make it available to all the favorites routes.
    const allUserFavoritesObjects = await UserFavorite.findAll({
      attributes: [
        "favorite",
      ],
      where: {
        "user_id": req.params.id,
      },
    })
    const allUserFavoritesArray = allUserFavoritesObjects.map(favorite => favorite.favorite)    
    res.status(200).json(allUserFavoritesArray)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router

// Questions/todos/nice-to-haves:
// - For POST /api/users/, do we need to return the password?
// - Investigate if it would be good to create docs using swagger-jsdoc (code-first approach), or swagger-codegen or openapi-generator (design-first approach). **
// - Add if/else statements to catch other errors, such as 400 and 404 (not just 500).
