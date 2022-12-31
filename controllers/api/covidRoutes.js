// Import the Express router.
const router = require("express").Router()

// Import axios.
const axios = require("axios")

// COVID-19 API base URL.
const baseUrl = "https://api.covid19api.com"

// GET /api/covid/:country/:state
router.get("/:country/:state", async (req, res) => {
  try {
    const country = req.params.country
    const state = req.params.state
    const fromDate = "2022-12-01T00:00:00Z"
    const toDate = "2022-12-01T01:00:00Z"
    const requestUrl = `${baseUrl}/country/${country}?province=${state}&from=${fromDate}&to=${toDate}`
    const result = await axios.get(requestUrl)
    res.status(200).json(result.data)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
