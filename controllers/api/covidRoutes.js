// Import the Express router.
const covidRouter = require("express").Router()

// Import the Axios library.
const axios = require("axios")

// Declare the COVID-19 API base URL.
const baseUrl = "https://api.covid19api.com"

// Declare the GET /api/covid/:country/:state route ().
covidRouter.get("/:country/:state", async (req, res) => {
  try {
    // Declare the region and date parameters.
    const country = req.params.country
    const state = req.params.state
    const city = req.query.city
    const from = `${req.query.date}T00:00:00Z`
    const to = `${req.query.date}T23:59:59Z`
    // Declare the COVID 19 API request URL and call it (see also: /country/:country).
    const requestUrl = `${baseUrl}/country/${country}?province=${state}&from=${from}&to=${to}`
    const result = await axios.get(requestUrl)
    // Return the city’s, or all cities’, COVID data.
    let covidData
    if (req.query.city) {
      covidData = result.data.filter(covidData => covidData.City === city)
    }
    else {
      covidData = result.data
    }
    res.status(200).json(covidData)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = covidRouter
