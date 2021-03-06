const router = require("express").Router();
const {
  models: { User, Order },
} = require("../db");
module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

// if a guest signs up while having items in their cart, update that here
router.post("/signup", async (req, res, next) => {
  try {
    const {username, password, email} = req.body
    // const user = await User.create(req.body);
    // role is default customer ;)
    // query database, findall where role guest
    const user = await User.create({username, password, email});
    await Order.create({userId: user.id})
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
