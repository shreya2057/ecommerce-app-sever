import mongoose from "mongoose";
import { ProductType } from "../../types/product";

const productSchema = new mongoose.Schema<ProductType>({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  discount: { type: Number, required: true },
  category_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  is_featured: { type: Boolean, required: true },
});

export const Product = mongoose.model("Product", productSchema);
