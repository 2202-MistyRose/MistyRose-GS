const Order = require("../db/models/Order");
const Product = require("../db/models/Product");
const router = require("express").Router();
const OrderItem = require("../db/models/OrderItem");
const { requireToken, isAdmin } = require("../utilities");

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.post("/", requireToken, async (req, res, next) => {
  try {
    const user = req.user;
    if (user.id !== req.body.userId) {
      throw Error("not a valid user");
    }
    const order = await Order.findOne({
      where: {
        userId: req.body.userId,
        status: true,
      },
    });
    const product = await Product.findOne({
      where: {
        id: req.body.prodId,
      },
    });
    // see if the item already exists in the table
    const cartItem = await OrderItem.findOne({
      where: {
        productId: req.body.prodId,
        orderId: order.id,
      },
    });

    if (cartItem) {
      await cartItem.update({ ...cartItem, quantity: cartItem.quantity + 1 });
      res.send(cartItem);
    } else {
      const newItem = await OrderItem.create({
        quantity: 1,
        totalPrice: product.price,
        productId: product.id,
        orderId: order.id,
      });
      res.send(newItem);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
