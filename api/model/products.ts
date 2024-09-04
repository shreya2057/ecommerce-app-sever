import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  discount: { type: String, required: true },
  category_id: { type: String, required: true },
  category_name: { type: String, required: true },
});

export const Product = mongoose.model("Product", productSchema);
