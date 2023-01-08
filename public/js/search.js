// Get city COVID data.
async function getCityCovidData(e) {
  e.preventDefault()
  // Display while “Searching...” searching.
  document.getElementById("city-covid-data").innerHTML = `<p class="searching">Searching...</p>`
  // Get the city and state from the user.
  const city = document.getElementById("city").value
  const state = document.getElementById("state").value
  // Get today’s date.
  const now = Date.now()
  const today = new Date(now)
  // Get yesteryesterday’s date (workaround, until we can convert user’s time to UTC).
  let yesteryesterday = new Date(today)
  yesteryesterday.setDate(today.getDate() - 2)
  yesteryesterday = yesteryesterday.toISOString().slice(0, 10)
  // If the user entered a city and state, call the getCityCovidData API and display the results.
  if (city && state) {
    // Call the API.
    const requestUrl = `/api/covid/united-states/${state}/${city}?date=${yesteryesterday}`
    let covidData = await fetch(requestUrl, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
    })
    covidData = await covidData.json()
    // Clear the city and state fields.
    document.getElementById("city").value = ""
    document.getElementById("state").value = ""
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
