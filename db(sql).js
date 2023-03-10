var mysql = require('mysql2');
const Promise = require("bluebird");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => console.log(`Connected to MySQL as id: ${db.threadId}`))
  .then(() => {
    return db.queryAsync(
      `CREATE TABLE IF NOT EXISTS products (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(200),
        slogan VARCHAR(200),
        description VARCHAR(200),
        category VARCHAR(200),
        default_price FLOAT,
        PRIMARY KEY (ID)
      )`
    );
  }).then(() => {
    return db.queryAsync(
      `CREATE TABLE IF NOT EXISTS features (
        id INT NOT NULL AUTO_INCREMENT,
        product_id INT,
        feature VARCHAR(200),
        value VARCHAR(200),
        PRIMARY KEY(id),
        FOREIGN KEY(product_id) REFERENCES products(id)
      )`
    );
  }).then(() => {
    return db.queryAsync(
      `CREATE TABLE IF NOT EXISTS styles (
        id INT NOT NULL AUTO_INCREMENT,
        product_id INT,
        name VARCHAR(200),
        original_price DECIMAL(15,2),
        sale_price DECIMAL(15,2),
        default_item BOOLEAN,
        PRIMARY KEY(id),
        FOREIGN KEY(product_id) REFERENCES products(id)
      )`
    );
  }).then(() => {
    return db.queryAsync(
      `CREATE TABLE IF NOT EXISTS photos (
        id INT NOT NULL AUTO_INCREMENT,
        style_id INT,
        url VARCHAR(200),
        thumbnail_vr VARCHAR(200),
        PRIMARY KEY(id),
        FOREIGN KEY(style_id) REFERENCES styles(id)
      )`
    );
  }).then(() => {
    return db.queryAsync(
      `CREATE TABLE IF NOT EXISTS skus (
        id INT,
        style_id INT,
        size VARCHAR(200),
        quantity INT,
        PRIMARY KEY(id),
        FOREIGN KEY(style_id) REFERENCES styles(id)
      )`
    );
  }).then(() => {
    return db.queryAsync(
      `CREATE TABLE IF NOT EXISTS related (
        id INT NOT NULL AUTO_INCREMENT,
        product_id INT,
        related_product_id INT,
        PRIMARY KEY(id),
        FOREIGN KEY(product_id) REFERENCES products(id)
      )`
    );
  })
  .catch((err) => console.log(err));

module.exports = db;