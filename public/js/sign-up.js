// Sign up user.
async function signUp(e) {
  e.preventDefault()
  // Get the first and last name, email, and password from the user.
  const firstName = document.getElementById("first-name").value.trim()
  const lastName = document.getElementById("last-name").value.trim()
  const email = document.getElementById("email").value.trim()
  const password = document.getElementById("password").value.trim()
  // If the user entered a first and last name, email, and password, call the signUpUser API.
  if (firstName && lastName && email && password) {
    // Call the API.
    const response = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "first_name": firstName,
        "last_name": lastName,
        email,
        password,
      }),
    })
    // If successful, redirect to home page. Else, display alert with error message.
    if (response.ok) {
      document.location.replace("/")
    } else {
      alert(response.statusText)
    }
  }
}

document.getElementById("sign-up-form").addEventListener("submit", signUp)