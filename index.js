const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let product = {
    name: null,
    price: 0,
    quantity: 0
};

app.get('/', (req, res) => {
    res.redirect('/product');
});

app.post('/product', (req, res) => {
    const { name, price, quantity } = req.body;
    product.name = name;
    product.quantity = quantity;
    product.price = price;
    res.send(product);
});

app.get('/product', (req, res) => {
    res.send(product);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
