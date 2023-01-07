// Get COVID data for a city.
function getSearchResults(e) {
  e.preventDefault()
  // Get the city and state from the user.
  const city = document.getElementById("city").value
  const state = document.getElementById("state").value
  console.log(city) // **
  console.log(state) // **
}
document.getElementById("search-form").addEventListener("submit", getSearchResults)



  // Make the API request
  fetch(`https://api.example.com/search?q=${searchQuery}`)
    .then(response => response.json())
    .then(data => {
      // Compile the Handlebars template
      const template = Handlebars.compile(document.getElementById('results-template').innerHTML);

      // Render the results
      const resultsHTML = template({ results: data.results });
      document.getElementById('results').innerHTML = resultsHTML;
    });

