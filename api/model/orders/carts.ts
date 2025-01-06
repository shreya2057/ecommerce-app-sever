import mongoose from "mongoose";
import { CartType } from "../../types/orders";

const cart_schema = new mongoose.Schema<CartType>({
  number: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, required: true },
});

export const Cart = mongoose.model("Cart", cart_schema);
