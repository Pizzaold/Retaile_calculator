const express = require('express');

const app = express();
const port = 3000;

app.get('/product', (req, res) => {
    res.send(product);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});