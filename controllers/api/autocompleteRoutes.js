// Import the Express router.
const autocompleteRouter = require("express").Router()

// Import Algoloa Search and set up dotenv.
const algoliasearch = require("algoliasearch")
require("dotenv").config()

// Start the JavaScript API client.
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY)

// Connect to the index.
const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME)

// Declare the GET /api/autocomplete/city route (get city suggestions).
autocompleteRouter.get("/city", async (req, res) => {
  try {
    index
    .search("San")
    .then((objects) => console.log(objects))
    res.status(200).end()
  } catch (err) {
    res.status(500).json(err)
  }
})

// Declare the GET /api/autocomplete/state route (get state suggestions).
autocompleteRouter.get("/state", async (req, res) => {
  try {
    index
    .search("Cal")
    .then((objects) => console.log(objects))
    res.status(200).end()
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = autocompleteRouter





// Search (need to change this to accept terms and return results),

// Docs:
// Install the API client: https://www.algolia.com/doc/api-client/getting-started/install/javascript/?client=javascript
// Get your Algolia Application ID and (admin) API key from the dashboard: https://www.algolia.com/account/api-keys

// Start the client: https://www.algolia.com/doc/api-client/getting-started/instantiate-client-index/

// Create an index (or connect to it, if an index with the name `ALGOLIA_INDEX_NAME` already exists)
// https://www.algolia.com/doc/api-client/getting-started/instantiate-client-index/#initialize-an-index

// Add new objects to the index
// https://www.algolia.com/doc/api-reference/api-methods/add-objects/
// const newObject = { objectID: 1, name: "Foo" }

// index
  // .saveObjects([newObject])
  // Wait for the indexing task to complete
  // https://www.algolia.com/doc/api-reference/api-methods/wait-task/
  // .wait()
  // .then((response) => {
    // console.log(response);
    // Search the index for "Fo"
    // https://www.algolia.com/doc/api-reference/api-methods/search/

  // }) ;
