require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const DB_NAME = process.env.DB_NAME;

// 1. Use mongoose to establish a connection to MongoDB
mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`);
const db = mongoose.connection;
db.on('error', (err) => console.error(err))
db.once('open', () => console.log(`Connected to ${DB_NAME}`))

// 2. Set up any schema and models needed by the app
// const productSchema = new mongoose.Schema({
//   id: Number,
//   name: String,
//   slogan: String,
//   description: String,
//   category: String,
//   default_price: Number,
//   related: [
//     {
//       id: Number,
//       current_product_id: Number,
//       related_product_id: Number
//     }
//   ],
//   features: [
//     {
//       id: Number,
//       product_id: Number,
//       feature: String,
//       value: String
//     }
//   ],
//   styles: [
//     {
//       id: Number,
//       productId: Number,
//       name: String,
//       sale_price: Number,
//       original_price: Number,
//       default_style: Number,
//       skuData : [
//         {
//           id: Number,
//           styleId: Number,
//           size: String,
//           quantity: Number
//         }
//       ],
//       photos: [
//         {
//           id: Number,
//           url: String,
//           thumbnail_url: String
//         }
//       ]
//     }
//   ]
// });

// // 3. Export the models
const productSchema = new mongoose.Schema({});
const Products = mongoose.model('Products', productSchema, 'prodAggTestFinal');
// const Products = mongoose.model('prodAggTestFinal', productSchema);


var getProduct = (id) => {
  return Products.find({id: id})
    .then(result => {
      console.log(result);
      return result;
    })
}


// 4. Import the models into any modules that need them
// module.exports.Products = Products;
module.exports.getProduct = getProduct;
