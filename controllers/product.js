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
    if (state && salesTax) {
      return res.status(400).json({
        error: "You can't specify both state and custom salesTax. Choose one.",
      });
    }
    if (salesTax && (salesTax < 0 || salesTax > 1)) {
      return res.status(400).json({
        error: "salesTax must be a number between 0 and 1",
      });
    }

    const parsedDiscount = parseFloat(discount);
    const parsedPrice = parseFloat(price);
    const parsedQuantity = parseFloat(quantity);

    const actualDiscount = isNaN(parsedDiscount) ? 0.1 : parsedDiscount;
    const actualPrice = isNaN(parsedPrice) ? 1 : parsedPrice;
    const actualQuantity = isNaN(parsedQuantity) ? 1 : parsedQuantity;

    const stateSalesTaxRates = {
      "UK": 0.3,
      "EE": 0.2,
      "US": 0.4,
      "AU": 0.5,
      "CA": 0.6
    };

    const newState = state;

    const newSalesTax = parseFloat(stateSalesTaxRates[newState]) || salesTax || 0.15;

    if (newState !== "EE" && newState !== "UK" && newState !== undefined && newState !== "US" && newState !== "AU" && newState !== "CA") {
      return res.status(400).json({
        error: "Invalid state",
      });
    }

    product.quantity = actualQuantity;
    product.price = actualPrice;
    product.discount = actualDiscount;
    product.salesTax = newSalesTax;
    product.state = newState;

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