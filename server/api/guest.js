const router = require('express').Router();
const {
  models: { User, Order, OrderItem, Product },
} = require("../db");

router.post('/guest/checkout', (req, res, next) => {
  try {
    const cart = req.body;
    cart.forEach(async (item) => {
      const product = await Product.findByPk(item.id);
      await product.update({...product, stock: product.stock - item.})
    })
  } catch(err) {
    next (err)
  }
})

module.exports = router;
