var productSchema = {
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  related: [
    {
      id: Number,
      current_product_id: Number,
      related_product_id: Number
    }
  ],
  features: [
    {
      id: Number,
      product_id: Number,
      feature: String,
      value: String
    }
  ],
  styles: [
    {
      id: Number,
      productId: Number,
      name: String,
      sale_price: Number,
      original_price: Number,
      default_style: Number,
      skuData : [
        {
          id: Number,
          styleId: Number,
          size: String,
          quantity: Number
        }
      ],
      photos: [
        {
          id: Number,
          url: String,
          thumbnail_url: String
        }
      ]
    }
  ]
}