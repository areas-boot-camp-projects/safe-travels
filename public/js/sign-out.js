// Sign out the user.
async function signOut() {
  const response = await fetch("/api/user/sign-out", {
    method: "POST",
  })
  .then(() => {
    document.cookie = "jwt_session="
    window.location.replace("/")
  })
  .catch(err => {
    console.error(err)
  })
}

document.getElementById("sign-out").addEventListener("click", signOut)
