require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// 1. Use mongoose to establish a connection to MongoDB
mongoose.connect('mongodb://localhost:27017/products');

// 2. Set up any schema and models needed by the app
const productSchema = new mongoose.Schema({
  productId: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  defaultPrice: Number,
  features: [
    {
      feature: String,
      value: String
    }
  ],
  styles: [
    {
      styleId: Number,
      name: String,
      salePrice: Number,
      originalPrice: Number,
      defaultStyle: Boolean,
      photos: [
        {
          url: String,
          thumbnailUrl: String
        }
      ],
      skuData : [
        {
          skuId: Number,
          size: String,
          quantity: Number
        }
      ]
    }
  ],
  relatedProducts: [Number]
});

// 3. Export the models
const Product = new mongoose.model('Product', productSchema);

var getAll = () => {
  return Product.find();
}

// var search = (word) => {
//   return Product.find({word: {"$regex": word}}).select('word definition -_id');
// }

var add = () => {
  var newProduct = new Product({
    productId: 5,
    name: 'asdf'
  });
  return newProduct.save();
}

// var update = (data) => {
//   return Word.findOneAndUpdate({word: data.word},{word: data.newWord, definition: data.definition});
// };

// var deleteWord = (data) => {
//   return Word.deleteOne({word: data.word});
// }

// 4. Import the models into any modules that need them
module.exports.Product = Product;
module.exports.getAll = getAll;
module.exports.add = add;
// module.exports.search = search;
// module.exports.update = update;
// module.exports.deleteWord = deleteWord;
