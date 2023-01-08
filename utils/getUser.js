// Import the User and UserFavorite models.
const { User, UserFavorite } = require("../models")

// Get a user’s details and favorites and return them as an object.
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

module.exports = getUser
