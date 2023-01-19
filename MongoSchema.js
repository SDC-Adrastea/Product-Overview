var productSchema = {
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
      defaultStyle: BOOLEAN,
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
}