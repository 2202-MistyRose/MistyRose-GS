const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;
