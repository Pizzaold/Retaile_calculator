const express = require('express');
const productRouter = require('./controllers/product');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let product = {
    quantity: 10,
    price: 500
};

app.use('/product', productRouter);

app.get('/', (req, res) => {
    res.redirect('/product');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
