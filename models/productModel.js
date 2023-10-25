const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productItems: [
      {
        itemTitle: String,
        itemValue: String,
      },
    ],

    title: { type: String, required: true },
    description: { type: String, required: true },
    creator: { type: String, required: true },
    image1: { type: String, required: true },
    image2: { type: String, required: true },
    qrImage: { type: String, default: "" },

    companyName: { type: String, required: true },
    logo: { type: String, required: true },
    social: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Products", productSchema);

module.exports = Product;
