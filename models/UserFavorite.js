// Import sequelize’s Model and DataTypes objects.
const { Model, DataTypes } = require("sequelize")

// Import the database connection details.
const sequelize = require("../config/connection")

// Extend the Model class.
class UserFavorite extends Model {}

// Define the UserFavorite class.
UserFavorite.init(
  {
    user_favorite_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    favorite_city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    favorite_state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: [
          "user_id",
          "favorite_city",
          "favorite_state",
        ],
        name: "unique_user_favorite",
      }
    ],
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "UserFavorite",
  }
)

module.exports = UserFavorite
