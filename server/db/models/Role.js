const Sequelize = require("sequelize");
const db = require("../db");

const Role = db.define("role", {
  name: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
    defaultValue: "Guest",
  },
});

module.exports = Role;
