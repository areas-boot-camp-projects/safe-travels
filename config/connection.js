// Import sequelize and dotenv.
const Sequelize = require("sequelize")
require("dotenv").config()

// Create a sequelize instance with the database connection details.
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
)

// Test the database connection.
sequelize
  .authenticate()
  .then(() => {
    console.log(`Connected successfully to the ${process.env.DB_NAME} database!`);
  })
  .catch(err => {
    console.error(`Unable to connect to the ${process.env.DB_NAME} database:`, err);
  })

module.exports = sequelize
