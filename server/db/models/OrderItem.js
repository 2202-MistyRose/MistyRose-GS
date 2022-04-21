const Sequelize = require("sequelize");
const db = require("../db");

const OrderItem = db.define("orderItem", {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: Sequelize.INTEGER,
  },
});

// might need to calculate here on total price

module.exports = OrderItem;
