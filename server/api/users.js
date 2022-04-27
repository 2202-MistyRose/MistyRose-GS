const router = require("express").Router();
const req = require("express/lib/request");
// const { NetworkCell } = require("@material-ui/icons");
const { user } = require("pg/lib/defaults");
const {
  models: { User, Order, OrderItem, Product },
} = require("../db");
module.exports = router;
const { requireToken, isAdmin } = require("../utilities");

router.get("/", isAdmin, async (req, res, next) => {
  try {
    // need to pass in a token in headers to this request for isAdmin to work
    const isAdmin = req.isAdmin;
    if (isAdmin) {
      const users = await User.findAll({
        attributes: ["id", "username", "email", "userRole"],
      });
      res.json(users);
    } else {
      throw "you are not permitted to view users!";
    }
  } catch (err) {
    next(err);
  }
});

// delete user
router.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    await user.destroy();
    res.send(user);
  } catch (err) {
    next(err);
  }
});

// get signed-in user cart
router.get("/:userId/cart", requireToken, async (req, res, next) => {
  try {
    // added this so it won't return another user's cart
    const user = req.user;
    if (user.id !== Number(req.params.userId)) {
      throw Error("not a valid user");
    }

    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: true,
      },
    });
    const cartItems = await OrderItem.findAll({
      where: {
        orderId: order.id,
      },
      include: [
        {
          model: Product,
        },
      ],
    });

    res.json(cartItems);
  } catch (err) {
    next(err);
  }
});

router.put("/:userId/cart", requireToken, async (req, res, next) => {
  try {
    const user = req.user;
    if (user.id !== Number(req.params.userId)) {
      throw Error("not a valid user");
    }
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: true,
      },
    });
    // increment / decrement
    const cartItem = await OrderItem.findOne({
      where: {
        orderId: order.id,
        productId: req.body.productId,
      },
    });
    res.json(await cartItem.update({ ...req.body }));
  } catch (err) {
    next(err);
  }
});

router.delete("/:userId/cart", async (req, res, next) => {
  try {
    // const user = req.user;
    // if (user.id !== Number(req.params.userId)) {
    //   throw Error('not a valid user')
    // }
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
      },
    });
    if (req.body.item) {
      // removing from cart
      const item = await OrderItem.findOne({
        where: {
          orderId: order.id,
          productId: req.body.item.productId,
        },
      });
      res.send(await item.destroy());
    } else {
      // clearing cart (if a req.body wasn't passed in)
      await OrderItem.destroy({
        where: {
          orderId: order.id,
        },
      });
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
});

// checkout
router.post("/:userId/checkout", async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: true,
      },
    });
    // inactivate their order
    order.update({ ...order, status: false });
    // create new empty order for them to keep shopping
    Order.create({ userId: req.params.userId });
    // cart is passed in req body
    req.body.forEach(async (item) => {
      let product = await Product.findOne({
        where: {
          id: item.productId,
        },
      });
      await product.update({
        ...product,
        stock: product.stock - item.quantity,
      });
    });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});
