// Import the Express router.
const router = require("express").Router()

// Define the GET / HTML route.
router.get("/", async (req, res) => {
  try {
    res.render("home")
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
