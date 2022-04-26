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
    defaultValue: "Phone",
  },
  price: {
    type: Sequelize.DECIMAL,
    defaultValue: 0,
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: "/images/defaultPic.jpg",
  },
});

module.exports = Product;
