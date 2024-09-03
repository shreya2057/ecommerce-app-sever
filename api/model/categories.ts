import mongoose from "mongoose";

const categories_schema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: false },
});

export const Categories = mongoose.model("Category", categories_schema);
