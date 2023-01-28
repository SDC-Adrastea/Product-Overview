require('dotenv').config();

const express = require('express');
const app = express();

const {getOneProduct, getProductStyles, getRelated} = require('./db');
app.use(express.json());

app.get('/', (req, res) => {
})

app.get('/products', (req, res) => {
// NEED TO DO
  getProduct(6)
  .then(product => {
    res.send(product);
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