require('dotenv').config();

const express = require('express');
const app = express();

const {getProducts, getOneProduct, getProductStyles, getRelated} = require('./db');
app.use(express.json());

app.get('/', (req, res) => {
})

app.get('/products', (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let count = parseInt(req.query.count) || 5;
  getProducts(page, count)
  .then(products => {
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