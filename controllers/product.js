const { Router } = require("express");

const productRouter = (product) => {
  const router = Router();

  router.post("/", (req, res) => {
    const { price, quantity, discount, state, salesTax } = req.body;
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

    const newState = state;

    const newSalesTax = parseFloat(salesTax) || 0.15;

    if (newState !== "EE" && newState !== "UK" && newState !== undefined) {
      return res.status(400).json({
        error: "Invalid state",
      });
    }

    product.quantity = actualQuantity;
    product.price = actualPrice;
    product.discount = actualDiscount;
    product.salesTax = newSalesTax;
    product.state = newState;

    if (newState === "UK") {
      product.salesTax = 0.3;
    } else if (newState === "EE") {
      product.salesTax = 0.2;
    };

    res.json(product);
  });

  router.get("/add", (req, res) => {
    const totalPriceBeforeTax =
      product.quantity * product.price * (1 - product.discount);
    const SalesTax = totalPriceBeforeTax * product.salesTax;
    const totalPriceWithTax = totalPriceBeforeTax + SalesTax;

    res.json({
      totalPriceWithTax,
      totalPriceBeforeTax,
    });
  });

  router.get("/", (req, res) => {
    res.json(product);
  });

  return router;
};

module.exports = productRouter;
