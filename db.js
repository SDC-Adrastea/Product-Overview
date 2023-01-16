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
  })
  .catch((err) => console.log(err));

module.exports = db;