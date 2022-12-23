// Import database connection details.
const sequelize = require("../config/connection")

// Import models.
const { User } = require("../models")

// Import seed data.
const userData = require("./userData.json")

// Use the seed data to seed the database.
async function seedDatabase() {
  await sequelize.sync({ force: true })
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  })
  process.exit(0)
}

seedDatabase()
