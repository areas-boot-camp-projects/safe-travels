// Import the Express router.
const router = require("express").Router()

// Define the GET / HTML route.
router.get("/", async (req, res) => {
  try {
    console.log("GET / request!")
    res.status(200).send("OK")
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
