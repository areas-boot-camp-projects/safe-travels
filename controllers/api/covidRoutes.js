// Import the Express router.
const router = require("express").Router()

// Import axios.
const axios = require("axios")

// GET /api/covid/ - 
router.get("/", async (req, res) => {
  try {
    const result = await axios.get("https://api.covid19api.com/")
    res.status(200).json(result.data)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
