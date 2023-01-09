// Import the Express router.
const covidDataRouter = require("express").Router()

// Import the Axios library.
const axios = require("axios")

// Declare the COVID-19 API base URL.
const baseUrl = "https://api.covid19api.com"

// Declare the GET /api/covid/:country/:state/:city route (get cases per city).
covidDataRouter.get("/:country/:state/:city", async (req, res) => {
  try {
    // Declare the region and date parameters.
    const country = req.params.country
    const state = req.params.state
    const city = req.params.city
    const from = `${req.query.date}T00:00:00Z`
    const to = `${req.query.date}T23:59:59Z`
    // Declare the COVID 19 API request URL and call it (see also: /country/:country/status/:status).
    const requestUrl = `${baseUrl}/country/${country}?province=${state}&from=${from}&to=${to}`
    const result = await axios.get(requestUrl)
    // Return the city’s, or all cities’, COVID data.
    let covidData
    if (req.params.city) {
      covidData = result.data.filter(covidData => covidData.City === city)
      // Create a single object with the important values.
      covidData = {
        city: covidData[0].City,
        state: covidData[0].Province,
        country: covidData[0].CountryCode,
        confirmed: covidData[0].Confirmed,
        active: covidData[0].Active,
        recovered: covidData[0].Recovered,
        deaths: covidData[0].Deaths,
      }
    }
    else {
      covidData = result.data
    }
    res.status(200).json(covidData)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = covidDataRouter
