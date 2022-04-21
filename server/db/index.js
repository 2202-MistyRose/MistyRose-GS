//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Role = require("./models/Role");
const Product = require("./models/Product");
const Order = require("./models/Order");
const OrderItem = require("./models/OrderItem");

//associations could go here!
User.hasOne(Role);
Role.belongsToMany(User, { through: "user_roles", foreignKey: "roleId" });

User.hasOne(Order);
Order.belongsTo(User);

Order.belongsToMany(Product, {
  through: OrderItem,
});
Product.belongsToMany(Order, {
  through: OrderItem,
});

module.exports = {
  db,
  models: {
    User,
    Role,
    Product,
    Order,
    OrderItem,
  },
};
