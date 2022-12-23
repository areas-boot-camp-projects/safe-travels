// Import sequelize’s Model and DataTypes objects.
const { Model, DataTypes } = require("sequelize")

// Import the database connection details.
const sequelize = require("../config/connection")

// Extend the Model class.
class UserFavorite extends Model {}

// Define the UserFavorite class.
UserFavorite.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    favorite: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "UserFavorite",
  }
)

module.exports = UserFavorite
