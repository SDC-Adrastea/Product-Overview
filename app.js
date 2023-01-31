require('dotenv').config();

const express = require('express');
const app = express();

const {getProducts, getOneProduct, getProductStyles, getRelated} = require('./db');
app.use(express.json());

app.get('/', (req, res) => {
})

app.get('/products', (req, res) => {
  let page = req.params.page;
  let count = req.params.count;
  getProducts(page, count)
  .then(products => {
    console.log(products);
    res.send(products);
  })
})

app.get('/products/:product_id', (req, res) => {
  let id = parseInt(req.params.product_id);
  getOneProduct(id)
  .then(product => {
    res.send(product);
  });
})

app.get('/products/:product_id/styles', (req, res) => {
  let id = parseInt(req.params.product_id);
  getProductStyles(id)
  .then(styles => {
    res.send(styles);
  });
})

app.get('/products/:product_id/related', (req, res) => {
  let id = parseInt(req.params.product_id);
  getRelated(id)
  .then(related => {
    res.send(related);
  });
})

module.exports = app;