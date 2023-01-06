// Import sequelize’s Model and DataTypes objects.
const { Model, DataTypes } = require("sequelize")

// Import the database connection details.
const sequelize = require("../config/connection")

// Import bcrypt.
const bcrypt = require("bcrypt")

// Extend the Model class and add a function to validate the user’s password.
class User extends Model {
  validatePassword(loginPassword) {
    return bcrypt.compareSync(loginPassword, this.password)
  }
}

// Define the User class.
User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUser) => {
        newUser.password = await bcrypt.hash(newUser.password, 10)
        return newUser
      },
      beforeUpdate: async (updatedUser) => {
        updatedUser.password = await bcrypt.hash(updatedUser.password, 10)
        return updatedUser
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "User",
  }
)

module.exports = User
