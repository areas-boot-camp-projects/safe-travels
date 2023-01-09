// Import the Express router.
const autocompleteSuggestionsRouter = require("express").Router()

// Import Algoloa Search and set up dotenv.
const algoliasearch = require("algoliasearch")
require("dotenv").config()

// Start the JavaScript API client.
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY)

// Connect to the index.
const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME)

// Declare the GET /api/autocomplete-suggestions/city route (get city suggestions).
autocompleteSuggestionsRouter.get("/", async (req, res) => {
  try {
    const city = req.query.city
    index.search(city, {
      attributesToRetrieve: [
        "city",
        "state",
      ]
    })
    .then(({ hits }) => {
      suggestions = hits.map(hit => ({
        city: hit.city,
        state: hit.state,
      }))
      res.status(200).json(suggestions)
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = autocompleteSuggestionsRouter
