const { Router } = require("express");

const router = Router();

router.post("/", (req, res) => {
  const { price, quantity } = req.body;
  product = {
    quantity,
    price,
  };
  res.json(product);
});

router.get("/add", (req, res) => {
  const totalPrice = (product.quantity * product.price).toFixed(2);
  res.json({ totalPrice });
});

router.get("/", (req, res) => {
  res.json(product);
});

module.exports = router;
