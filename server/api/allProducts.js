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

router.get("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// POST /api/products/admin
router.post("/admin", async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id
router.put("/:id", async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.send(await product.update(req.body));
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    await product.destroy();
    res.send(product);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
