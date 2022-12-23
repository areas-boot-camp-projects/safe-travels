// Import the Express router.
const router = require("express").Router()

// Import axios.
const axios = require("axios")

// Define the GET /covid API route.
router.get("/", async (req, res) => {
  try {
    console.log("GET /api/covid request!")
    res.status(200).send("OK")
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router