// todo: Add async/await and try/catch to all routes.

// Import the Express router.
const pageRouter = require("express").Router()

// Import the User and UserFavorite models.
const { User, UserFavorite } = require("../../models")

// Import JWT.
const jwt = require("jsonwebtoken")

// Get a user’s token from their cookie.
function getToken(cookie) {
  let token
  if (cookie.startsWith("jwt_session=")) {
    token = cookie.replace("jwt_session=", "")
  }
  return token
}

// Get a user’s details and favorites and return them as an object. ** todo: move this out so it’s available to other files.
async function getUser(userId) {
  try {
    // Query the database.
    let user = await User.findOne({
      attributes: [
        "user_id",
        "first_name",
        "last_name",
        "email",
      ],
      where: {
        "user_id": userId,
      },
      include: [{
        model: UserFavorite,
        required: false,
        attributes: [
          "favorite_city",
          "favorite_state",
        ],
        where: {
          "user_id": userId,
        },
      }],
    })
    // Convert the output to a plain JavaScript object.
    user = user.toJSON()
    // Rename “UserFavorites” to “favorites”.
    user = {
      ...user,
      favorites: user.UserFavorites,
    }
    delete user.UserFavorites
    // Return the new object.
    return user
  } catch (err) {
    throw err
  }
}

// Declare the GET / route (get the home page).
pageRouter.get("/", async (req, res) => {
  const token = await getToken(req.headers.cookie)
  if (token) {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const user = await getUser(decodedToken.user_id)
    console.log(user) // **
    res.render("home", {
      token: token,
      user: user,
    })
  } else {
    res.render("home", {
      token: token,
    })
  }
})

// Declare the GET /sign-up route (get the home page).
pageRouter.get("/sign-up", (req, res) => {
  const token = getToken(req.headers.cookie)
  if (!token) {
    res.render("sign-up", { token: token })
  } else if (token) {
    res.redirect("/")
  }
})

// Declare the GET /sign-in route (get the home page).
pageRouter.get("/sign-in", (req, res) => {
  const token = getToken(req.headers.cookie)
  if (!token) {
    res.render("sign-in", { token: token })
  } else if (token) {
    res.redirect("/")
  }
})

module.exports = pageRouter
