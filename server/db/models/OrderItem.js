const Sequelize = require("sequelize");
const db = require("../db");

const OrderItem = db.define("orderItem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
});

module.exports = OrderItem;
