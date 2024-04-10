const { Router } = require("express");

const router = Router();

router.post("/", (req, res) => {
  const { price, quantity, discount } = req.body;
  if (!price || !quantity) {
    return res.status(400).json({
      error: "price and quantity are required",
    });
  }
  const parsedDiscount = parseFloat(discount);
  const parsedPrice = parseFloat(price);
  const parsedQuantity = parseFloat(quantity);

  const actualDiscount = isNaN(parsedDiscount) ? 0.1 : parsedDiscount;
  const actualPrice = isNaN(parsedPrice) ? 1 : parsedPrice;
  const actualQuantity = isNaN(parsedQuantity) ? 1 : parsedQuantity;

  product = {
    quantity: actualQuantity,
    price: actualPrice,
    discount: actualDiscount,
  };
  res.json(product);
});

router.get("/add", (req, res) => {
  const totalPrice = (product.quantity * product.price * (1 - product.discount)).toFixed(2);
  const finalPrice = Math.max(totalPrice, 0); 
  res.json({
    totalPrice: finalPrice,
  });
});

router.get("/", (req, res) => {
  res.json(product);
});

module.exports = router;
