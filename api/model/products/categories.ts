import mongoose from "mongoose";
import { CategoryType } from "../../types/product";

const categories_schema = new mongoose.Schema<CategoryType>({
  name: { type: String, required: true },
  is_active: { type: Boolean, required: true },
  is_deleted: { type: Boolean, required: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: false },
});

export const Categories = mongoose.model("Category", categories_schema);
