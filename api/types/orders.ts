import mongoose from "mongoose";

export type CartType = {
  product: mongoose.Schema.Types.ObjectId;
  number: number;
  user: mongoose.Schema.Types.ObjectId;
};
