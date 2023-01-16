require('dotenv').config();

const express = require('express');
const app = express();
const db = require("./db.js");


app.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = app;