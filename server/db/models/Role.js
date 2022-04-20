const Sequelize = require("sequelize");
const db = require("../db");

const Role = db.define(
  "role",
  {
    name: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: false,
    },
  },
  {
    tableName: "roles",
  }
);

module.exports = Role;
