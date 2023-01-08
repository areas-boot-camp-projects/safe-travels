// Import the Express router and Sequelize operators.
const userFavoriteRouter = require("express").Router()
const { Sequelize, Op } = require("sequelize")

// Import the UserFavorite models.
const { UserFavorite } = require("../../models")

// Import the getUser() util function.
const getUser = require("../../utils/getUser")

// Declare the GET /api/user/:id/favorites routes (get a user’s favorites)
userFavoriteRouter.get("/:id/favorites", async (req, res) => {
  try {
    // Return the user’s details and favorites.
    const allUserFavorites = await getUser(req.params.id)
    res.status(200).json(allUserFavorites)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Declare the POST /api/user/:id/favorites routes (add a user’s favorites)
userFavoriteRouter.post("/:id/favorites", async (req, res) => {
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
userFavoriteRouter.delete("/:id/favorites", async (req, res) => {
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

module.exports = userFavoriteRouter
