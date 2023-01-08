// Todo:
// - When I click a favorite, it gets added to the search fields.
// - When I click to delete a favorite, it gets deleted.
// - Nice-to-have: When I delete a favorite, display an undo button that adds it back.

// Add favorite to search.
function addFavoriteToSearch(e) {
  const button = e.currentTarget
  const favoriteCity = button.querySelector(".favorite-city").innerText
  const favoriteState = button.querySelector(".favorite-state").innerText
  document.getElementById("search-city").value = favoriteCity
  document.getElementById("search-state").value = favoriteState
}

// Add event listeners to all favorites.
const favorites = document.querySelectorAll(".favorite")
favorites.forEach((favorite) => {
  favorite.addEventListener("click", addFavoriteToSearch)
})
