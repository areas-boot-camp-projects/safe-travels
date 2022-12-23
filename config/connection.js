// Import sequelize and dotenv.
const Sequelize = require("sequelize")
require("dotenv").config()

// Create a sequelize instance.
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
)

// Test the connection.
sequelize
  .authenticate()
  .then(() => {
    console.log(`Connected successfully to ${process.env.DB_NAME}!`);
  })
  .catch(err => {
    console.error(`Unable to connect to ${process.env.DB_NAME}:`, err);
  })

// Export the sequelize instance.
module.exports = sequelize
