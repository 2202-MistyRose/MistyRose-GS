const Sequelize = require("sequelize");
const db = require("../db");

const CartItem = db.define("cartItem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
});

module.exports = CartItem;
