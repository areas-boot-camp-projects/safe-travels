// Get autocomplete suggestions.
async function getAutocompleteSuggestions(e) {
  // Capture user’s input as they’re typing.
  const userInput = e.target.value
  // Call the API.
  const response = await fetch(`/api/autocomplete-suggestions?city=${userInput}`)
  let suggestions = await response.json()
  // Display the suggestions to the user.
  const suggestionsList = document.getElementById("search-suggestions")
  suggestionsList.innerHTML = ""
  for (const suggestion of suggestions) {
    const li = document.createElement("li")
    li.classList.add("px-5", "py-1")
    li.innerHTML = `
    <button class="suggestion text-blue-500">
      <span class="suggestion-city">${suggestion.city}</span>,
      <span class="suggestion-state">${suggestion.state}</span>
    </button>
      `
    suggestionsList.appendChild(li)
  }
  // Add listeners to each search suggestion.
  suggestions = document.querySelectorAll(".suggestion")
  suggestions.forEach((suggestion) => {
    suggestion.addEventListener("click", addAutocompleteSuggestionToSearch)
  })
}

document.getElementById("search-city").addEventListener("input", getAutocompleteSuggestions)

// Add a autocomplete suggestion to search.
function addAutocompleteSuggestionToSearch() {
  // Get the button’s parent element.
  const parent = this.parentNode
  // Get the city and state.
  const suggestionCity = parent.querySelector(".suggestion-city").innerText
  const suggestionState = parent.querySelector(".suggestion-state").innerText
  // Put the city and state into the search fields.
  document.getElementById("search-city").value = suggestionCity
  document.getElementById("search-state").value = suggestionState
  // Clear the suggestions.
  document.getElementById("search-suggestions").innerHTML = ""  
}

// Search for COVID data by city.
async function searchForCovidDataByCity(e) {
  e.preventDefault()
  // Get the city and state from the user.
  const searchCity = document.getElementById("search-city").value
  const searchState = document.getElementById("search-state").value
  // Get today’s date.
  const now = Date.now()
  const today = new Date(now)
  // Get yesteryesterday’s date (workaround, until we can convert user’s time to UTC).
  let yesteryesterday = new Date(today)
  yesteryesterday.setDate(today.getDate() - 2)
  yesteryesterday = yesteryesterday.toISOString().slice(0, 10)
  // If the user entered a city and state, call the getCityCovidData API and display the results.
  if (searchCity && searchState) {
    // Display while “Searching...” searching.
    document.getElementById("city-covid-data").innerHTML = `<p class="searching">Searching...</p>`
    // Call the API.
    const requestUrl = `/api/covid/united-states/${searchState}/${searchCity}?date=${yesteryesterday}`
    let covidData = await fetch(requestUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
    covidData = await covidData.json()
    // Clear the city, state, and suggestions fields.
    document.getElementById("search-city").value = ""
    document.getElementById("search-state").value = ""
    document.getElementById("search-suggestions").innerHTML = ""
    // Display the results.
    document.getElementById("results").innerHTML = "Results"
    document.getElementById("city-covid-data").innerHTML = `
      <h3 class="result-item bg-white opacity-80 px-5 py-3 rounded-t-lg border-b-2">
        <span id="city-state"></span>
        <button class="add-favorite text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-green-500">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clip-rule="evenodd" />
          </svg>    
        </button>
      </h3>
      <ul class="bg-white opacity-80 px-5 py-3 rounded-b-lg">
        <li id="confirmed" class="result-item"></li>
        <li id="active" class="result-item"></li>
        <li id="recovered" class="result-item"></li>
        <li id="deaths" class="result-item"></li>
      </ul>
      `
    document.getElementById("city-state").innerHTML = `
      <span class="favorite-city">${covidData.city}</span>, 
      <span class="favorite-state">${covidData.state}</span>
      `
    document.getElementById("confirmed").innerHTML = `Confirmed: ${covidData.confirmed}`
    document.getElementById("active").innerHTML = `Active: ${covidData.active}`
    document.getElementById("recovered").innerHTML = `Recovered: ${covidData.recovered}`
    document.getElementById("deaths").innerHTML = `Deaths: ${covidData.deaths}`
    // If the user is signed out, hide the add-favorite button. Else, add a listener to it.
    if (document.getElementById("sign-in")) {
      document.querySelector(".add-favorite").classList.add("hidden")
    } else {
      document.querySelector(".add-favorite").addEventListener("click", addUserFavorite)
    }
  }
}

document.getElementById("search-form").addEventListener("submit", searchForCovidDataByCity)

// Add or delete user favorites.
async function addOrDeleteUserFavorite(addOrDelete, buttonParent) {
  let method
  if (addOrDelete === "add") { method = "POST" }
  else if (addOrDelete === "delete") { method = "DELETE" }
  // Get user"s ID.
  const userId = document.getElementById("user-id").innerText
  // Get the city and state.
  const favoriteCity = buttonParent.querySelector(".favorite-city").innerText
  const favoriteState = buttonParent.querySelector(".favorite-state").innerText
  // Call the API.
  await fetch(`/api/user/${userId}/favorites`, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify([{
      "favorite_city": favoriteCity,
      "favorite_state": favoriteState,
    }]),
  })
  // Reload the page to show the refreshed list of favorites.
  location.reload()
}

// Add a user favorite.
async function addUserFavorite() {
  // Get the button’s parent element.
  const buttonParent = this.parentNode
  addOrDeleteUserFavorite("add", buttonParent)
}

// Delete a user favorite.
async function deleteUserFavorite() {
  // Get the button’s parent element.
  const buttonParent = this.parentNode
  addOrDeleteUserFavorite("delete", buttonParent)
}

// If there’s a delete-favorite button, add a listener to it.
if (document.querySelectorAll(".delete-favorite")) {
  document.querySelectorAll(".delete-favorite").forEach(button => {
    button.addEventListener("click", deleteUserFavorite)
  })
}

// Add a user favorite to search.
function addUserFavoriteToSearch() {
  // Get the button’s parent element.
  const parent = this.parentNode
  // Get the city and state.
  const favoriteCity = parent.querySelector(".favorite-city").innerText
  const favoriteState = parent.querySelector(".favorite-state").innerText
  // Put the city and state into the search fields.
  document.getElementById("search-city").value = favoriteCity
  document.getElementById("search-state").value = favoriteState
}

// Add listeners to each user favorites.
const favorites = document.querySelectorAll(".favorite")
favorites.forEach((favorite) => {
  favorite.addEventListener("click", addUserFavoriteToSearch)
})
