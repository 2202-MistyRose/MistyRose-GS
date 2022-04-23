const Order = require('../db/models/Order');
const Product = require('../db/models/Product');
const router = require('express').Router();
const OrderItem = require('../db/models/OrderItem')

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products)
  } catch(err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    // const order = await Order.findOne({
    //   where: {
    //     userId: req.params.userId,
    //     status: true
    //   }
    // })
    console.log('reqbody:',req.body)
    const order = await Order.findOne({
      where: {
        userId: req.body.userId
      }
    })
    const product = await Product.findOne({
      where: {
        id: req.body.prodId
      }
    })




    const newItem = await OrderItem.create({
      quantity: 1,
      totalPrice: product.price,
      productId: product.id,
      orderId: order.id
    })
    res.send(newItem)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.json(product)
  } catch(err) {
    next(err)
  }
})

module.exports = router;
