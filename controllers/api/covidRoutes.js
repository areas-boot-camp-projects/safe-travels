// Import the Express router.
const router = require("express").Router()

// Import axios.
const axios = require("axios")

// COVID-19 API base URL.
const baseUrl = "https://api.covid19api.com"

// GET /api/covid/:country/:state route (get covid data for state and city)
router.get("/:country/:state", async (req, res) => {
  try {
    // Save the path parameters.
    const country = req.params.country
    const state = req.params.state
    // Save the query parameters.
    const city = req.query.city
    const from = req.query.from
    const to = req.query.to
    // Create the COVID 19 API request URL and call it.
    const requestUrl = `${baseUrl}/country/${country}?province=${state}&from=${from}&to=${to}`
    const result = await axios.get(requestUrl)
    // Filter results by city, or send it all.
    let cityData
    if (req.query.city) {
      cityData = result.data.filter(cityData => cityData.City === city)
    } else {
      cityData = result.data
    }
    res.status(200).json(cityData)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
