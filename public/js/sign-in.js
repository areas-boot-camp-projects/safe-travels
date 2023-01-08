// Sign in the user.
async function signIn(e) {
  e.preventDefault()
  // Get the email and password from the user.
  const email = document.getElementById("email").value.trim()
  const password = document.getElementById("password").value.trim()
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
