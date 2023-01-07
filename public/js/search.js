// Get COVID data for a city.
async function getSearchResults(e) {
  e.preventDefault()

  // Get the city and state from the user.
  const city = document.getElementById("city").value
  const state = document.getElementById("state").value

  // Get yesterday’s date (todo: get today, converted to UTC).
  const now = Date.now()
  const today = new Date(now)
  let yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  yesterday = yesterday.toISOString().slice(0, 10)

  // If the user entered a city and state, call the API.
  if (city && state) {
    const requestUrl = `/api/covid/united-states/${state}/${city}?date=${yesterday}`
    let covidData = await fetch(requestUrl, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
    })
    covidData = await covidData.json()
    console.log(covidData) //
    // Display the results.
    document.getElementById("covid-data").innerHTML = JSON.stringify(covidData)
  }
}

document.getElementById("search-form").addEventListener("submit", getSearchResults)
