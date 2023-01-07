// Import sequelize’s Model and DataTypes objects.
const { Model, DataTypes } = require("sequelize")

// Import the database connection details.
const sequelize = require("../config/connection")

// Extend the Model class and add a function to validate the user’s password.
class City extends Model {}

// Define the City class.
City.init(
  {
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "City",
  }
)

module.exports = City
