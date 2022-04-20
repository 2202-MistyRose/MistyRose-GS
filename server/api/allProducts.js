const Product = require('../db');

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (err) {
    next(err)
  }
}

module.exports = getAllProducts;

// set up in index
