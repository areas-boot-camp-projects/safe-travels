// Import the database connection details.
const sequelize = require("../config/connection")

// Import the models.
const { User, UserFavorite } = require("../models")

// Import the seed data.
const userData = require("./userData.json")
const userFavoriteData = require("./userFavoriteData.json")

// Use the seed data to seed the database.
async function seedDatabase() {
  // Sync the data model with the database table (and drop the table if it already exists).
  await sequelize.sync({ force: true })
  // Seed the User table with the userData.json file.
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  })
  // Seed the UserFavorite table with the userFavoriteData.json file.
  const userFavorites = await UserFavorite.bulkCreate(userFavoriteData, {
    individualHooks: true,
    returning: true,
  })
  process.exit(0)
}

seedDatabase()
