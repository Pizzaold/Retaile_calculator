const { Router } = require("express");

const router = Router();

const StateTax = 0.20;

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
  const totalPriceBeforeTax = product.quantity * product.price * (1 - product.discount);
  const stateTax = totalPriceBeforeTax * StateTax;
  const totalPriceWithTax = totalPriceBeforeTax + stateTax;

  res.json({
    totalPriceWithTax,
    totalPriceBeforeTax,
  });
});

router.get("/", (req, res) => {
  res.json(product);
});

module.exports = router;
