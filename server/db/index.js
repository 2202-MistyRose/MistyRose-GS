//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");

const Role = require("./models/Role");

const Product = require("./models/Product");

//associations could go here!
User.hasOne(Role);
Role.belongsToMany(User, { through: "user_roles", foreignKey: "roleId" });

module.exports = {
  db,
  models: {
    User,
    Role,
    Product,
  },
};
