// Import the Express router.
const router = require("express").Router()

// GET /api/users
router.get("/", async (req, res) => {
  try {
    console.log("GET /api/users!") // **
    res.status(200).json("GET /api/users!") // **
  } catch (err) {
    res.status(500).json(err)
  }
})

// GET /api/users/favorites
router.get("/favorites", async (req, res) => {
  try {
    console.log("GET /api/users/favorites!")
    res.status(200).json("GET /api/users/favorites!")
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
