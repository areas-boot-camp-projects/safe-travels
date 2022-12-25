// Import the Express router.
const router = require("express").Router()

// Import the User model.
const { User } = require("../../models")

// GET /api/users.
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

// GET /api/users/:id.
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

// POST /api/users/:id.


// GET /api/users/favorites/:id
router.get("/favorites/:id", async (req, res) => {
  try {
    console.log("GET /api/users/favorites/:id!")
    res.status(200).json("GET /api/users/favorites/:id!")
  } catch (err) {
    res.status(500).json(err)
  }
})

// POST /api/users/favorites/:id


module.exports = router
