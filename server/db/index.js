//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Role = require("./models/Role");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
const CartItem = require("./models/Cart-Item");

//associations could go here!
User.hasOne(Role);
Role.belongsToMany(User, { through: "user_roles", foreignKey: "roleId" });

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, {
  through: CartItem,
});
Product.belongsToMany(Cart, {
  through: CartItem,
});

module.exports = {
  db,
  models: {
    User,
    Role,
    Product,
    Cart,
    CartItem,
  },
};
