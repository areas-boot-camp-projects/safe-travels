// Sign in user.
async function signIn(e) {
  e.preventDefault()
  // Get the email and password from the user.
  const email = document.getElementById("sign-in-email").value.trim()
  const password = document.getElementById("sign-in-password").value.trim()
  // If the user entered an email and password, call the signInUser API.
  if (email && password) {
    // Call the API.
    const response = await fetch("/api/user/sign-in", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    })
    // If successful, redirect to home page. Else, display alert with error message.
    if (response.ok) {
      document.location.replace("/")
    } else {
      alert(response.statusText)
    }
  }
}

document.getElementById("sign-in-form").addEventListener("submit", signIn)

// Sign up user.
async function signUp(e) {
  e.preventDefault()
  // Get the first and last name, email, and password from the user.
  const firstName = document.getElementById("sign-up-first-name").value.trim()
  const lastName = document.getElementById("sign-up-last-name").value.trim()
  const email = document.getElementById("sign-up-email").value.trim()
  const password = document.getElementById("sign-up-password").value.trim()
  // If the user entered a first and last name, email, and password, call the signUpUser API.
  if (firstName && lastName && email && password) {
    // Call the API.
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        firstName: "first_name",
        lastName: "last_name",
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
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