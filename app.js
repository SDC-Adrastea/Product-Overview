require('dotenv').config();

const express = require('express');
const app = express();
const db = require("./db.js");

const dbGetAll = require('./db').getAll;
const dbAdd = require('./db').add;


app.get('/', (req, res) => {
  dbAdd()
  .then(() => {
    dbGetAll()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.send(err)
    })
  })
})

module.exports = app;