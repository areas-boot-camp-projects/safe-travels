// Get city COVID data.
async function getCityCovidData(e) {
  e.preventDefault()
  // Display while “Searching...” searching.
  document.getElementById("city-covid-data").innerHTML = `<p class="searching">Searching...</p>`
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
    // Call the API.
    const requestUrl = `/api/covid/united-states/${searchState}/${searchCity}?date=${yesteryesterday}`
    let covidData = await fetch(requestUrl, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
    })
    covidData = await covidData.json()
    // Clear the city and state fields.
    document.getElementById("search-city").value = ""
    document.getElementById("search-state").value = ""
    // Display the results.
    document.getElementById("results").innerHTML = "Results"
    document.getElementById("city-covid-data").innerHTML = `
      <h3 id="city-state" class="result-item"></h3>
      <ul>
        <li id="confirmed" class="result-item"></li>
        <li id="active" class="result-item"></li>
        <li id="recovered" class="result-item"></li>
        <li id="deaths" class="result-item"></li>
      </ul>
      `
    document.getElementById("city-state").innerHTML = `${covidData.city}, ${covidData.state} ${covidData.country}`
    document.getElementById("confirmed").innerHTML = `Confirmed: ${covidData.confirmed}`
    document.getElementById("active").innerHTML = `Active: ${covidData.active}`
    document.getElementById("recovered").innerHTML = `Recovered: ${covidData.recovered}`
    document.getElementById("deaths").innerHTML = `Deaths: ${covidData.deaths}`
  }
}

document.getElementById("search-form").addEventListener("submit", getCityCovidData)
