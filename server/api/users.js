const router = require("express").Router();
// const { NetworkCell } = require("@material-ui/icons");
const { user } = require("pg/lib/defaults");
const {
  models: { User, Order, OrderItem, Product },
} = require("../db");
module.exports = router;

// making sure we keep track of which user is signed in
const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// create a post route for users
router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId/cart", requireToken, async (req, res, next) => {
  try {
    // added this so it won't return another user's cart
    const user = req.user;
    if (user.id !== Number(req.params.userId)) {
      throw Error("not valid user");
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

router.put("/:userId/cart", async (req, res, next) => {
  try {
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
    if (cartItem.quantity === 0) {
      res.json(await cartItem.destroy());
    } else {
      res.json(await cartItem.update({ ...req.body }));
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:userId/cart", async (req, res, next) => {
  try {
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
router.post('/:userId/checkout', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: true,
      },
    });
    // inactivate their order
    order.update({...order, status: false})
    // create new empty order for them to keep shopping
    Order.create({userId: req.params.userId})
    // cart is passed in req body
    req.body.forEach(async item => {
      let product = await Product.findOne({
        where: {
          id: item.productId
        }
      })
      await product.update({...product, stock: product.stock - item.quantity})
    })
    res.sendStatus(200);
  } catch (err) {
    next(err)
  }
})
