const router = require('express').Router();
const { user } = require('pg/lib/defaults');
const {
  models: { User, Order, OrderItem, Product },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// create a post route for users
router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// getting cart items associated to user logged in
// need to send back data for the products as well so might have to join the order_products table with the products when sending back data
router.get('/:userId/cart', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: true
      }
    });
    const cartItems = await OrderItem.findAll({
      where: {
        orderId: order.id
      },
      include: [{
        model: Product,
        // foreignKey: 'productId'
      }]
    })

    res.json(cartItems)
  } catch (err) {
    next(err)
  }
})

// router.post('/:userId/cart', async (req, res, next) => {
//   try {
//     const order = await Order.findOne({
//       where: {
//         userId: req.params.userId,
//         status: true
//       }
//     });

//     await order.update({...order, status: false})
//     res.send(await Order.create({userId: req.params.id}))
//   } catch (err) {
//     next(err)
//   }
// })

router.put('/:userId/cart', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: true
      }
    });
    if (req.body.productId) { // increment / decrement
      const cartItem = await OrderItem.findOne({
        where: {
          orderId: order.id,
          productId: req.body.productId
        }
      })
      if (cartItem.quantity === 0) {
        res.json(await cartItem.destroy())
      } else {
        res.json(await cartItem.update({...req.body}))
      }
    } else { // updating when checkout occurs, no req.body
      await order.update({...order, status: false}) // inactivate order
      await Order.create({userId: req.params.userId}) // new order
      // const orderItems = await OrderItem.findAll({
      //   where: {
      //     orderId: order.id
      //   }
      // })
      res.sendStatus(200)
    }
  } catch (err) {
    next(err)
  }
})

// delete request, there will be a remove from cart button
router.delete('/:userId/cart', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId
      }
    })

    if (req.body.item) { // removing from cart
      const item = await OrderItem.findOne({
        where: {
          orderId: order.id,
          productId: req.body.item.productId
        }
      })
      res.send(await item.destroy())

    } else { // clearing cart
      await OrderItem.destroy({
        where: {
          orderId: order.id
        }
      })
      res.sendStatus(204);
    }
  } catch (err) {
    next(err)
  }
})
