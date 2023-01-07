// Get city COVID data.
async function getCityCovidData(e) {
  e.preventDefault()
  // Display while searching.
  document.getElementById("city-covid-data").innerHTML = `<p class="searching">Searching...</p>`
  // Get the city and state from the user.
  const city = document.getElementById("city").value
  const state = document.getElementById("state").value
  // Get today’s date.
  const now = Date.now()
  const today = new Date(now)
  // Get yesterday’s date (workaround, until we can convert user’s time to UTC).
  let yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  yesterday = yesterday.toISOString().slice(0, 10)
  // If the user entered a city and state, call the getCityCovidData API and display the results.
  if (city && state) {
    // Call the API.
    const requestUrl = `/api/covid/united-states/${state}/${city}?date=${yesterday}`
    let covidData = await fetch(requestUrl, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
    })
    covidData = await covidData.json()
    // Clear the city and state fields.
    document.getElementById("city").value = ""
    document.getElementById("state").value = ""
    // Display the results.
    document.getElementById("results").innerHTML = `Results (${covidData.city}, ${covidData.state} ${covidData.country})`
    document.getElementById("city-covid-data").innerHTML = `
      <p id="confirmed" class="result-item"></p>
      <p id="active" class="result-item"></p>
      <p id="recovered" class="result-item"></p>
      <p id="deaths" class="result-item"></p>
    `
    document.getElementById("confirmed").innerHTML = `Confirmed: ${covidData.confirmed}`
    document.getElementById("active").innerHTML = `Active: ${covidData.active}`
    document.getElementById("recovered").innerHTML = `Recovered: ${covidData.recovered}`
    document.getElementById("deaths").innerHTML = `Deaths: ${covidData.deaths}`
  }
}

document.getElementById("search-form").addEventListener("submit", getCityCovidData)
