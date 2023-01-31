require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const DB_NAME = process.env.DB_NAME;

// 1. Use mongoose to establish a connection to MongoDB
mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`);
const db = mongoose.connection;
db.on('error', (err) => console.error(err))
db.once('open', () => console.log(`Connected to ${DB_NAME}`))

// 2. Setup model
const productSchema = new mongoose.Schema({});
const Products = mongoose.model('Products', productSchema, 'prodAggTestFinal');


var getProducts = (page, count) => {
  var products = [];
  var promises = [];
  var start = count * page - count + 1
  for (let i = start; i < start + count; i++) {
    promises.push(Products.find({id: i})
    .then(result => {
      result = result[0]._doc;
      let formattedResult = {
        "id": result.id,
        "name": result.name,
        "slogan": result.slogan,
        "description": result.description,
        "category": result.category,
        "default_price": result.default_price.toString(),
      }
      products.push(formattedResult);
    }))
  }
  return Promise.all(promises)
  .then(() => {
    return products;
  })
}

var getOneProduct = (id) => {
  return Products.find({id: id})
    .then(result => {
      result = result[0]._doc;
      let features = [];
      result.features.forEach(feature => {
        features.push({feature: feature.feature, value: feature.value})
      })
      let formattedResult = {
        "id": result.id,
        "name": result.name,
        "slogan": result.slogan,
        "description": result.description,
        "category": result.category,
        "default_price": result.default_price.toString(),
        "features": features
      }
      return formattedResult;
    })
}

var getProductStyles = (id) => {
  return Products.find({id: id})
    .then(result => {
      result = result[0]._doc;
      let styles = [];
      result.styles.forEach(style => {
        let photos = []
        style.photos.forEach(photo => {
          photos.push({thumbnail_url: photo.thumbnail_url, url: photo.url})
        })
        let skus = {}
        style.skus.forEach(sku => {
          skus[sku.id] = {quantity: sku.quantity, size: sku.size.toString()}
        })
        styles.push({
          style_id: style.id,
          name: style.name,
          original_price: style.original_price,
          sale_price: style.sale_price,
          'default?': !!style.default_style,
          photos: photos,
          skus: skus
        })
      })
      let formattedResult = {
        "product_id": result.id.toString(),
        "results": styles
      }
      return formattedResult;
    })
}

var getRelated = (id) => {
  return Products.find({id: id})
  .then(result => {
    result = result[0]._doc;
    let related = [];
    result.related.forEach(item => {
      related.push(item.related_product_id)
    })
    return related;
  })
}

// 4. Import the models into any modules that need them
module.exports.getProducts = getProducts;
module.exports.getOneProduct = getOneProduct;
module.exports.getProductStyles = getProductStyles;
module.exports.getRelated = getRelated;
