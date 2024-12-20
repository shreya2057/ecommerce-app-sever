import mongoose from "mongoose";

export type CategoryType = {
  name: string;
  is_active: boolean;
  is_deleted: boolean;
  createdAt: string;
  updatedAt?: string;
};

export type ProductType = {
  title: string;
  price: number;
  description: string;
  image: string;
  discount: number;
  category_id: mongoose.Schema.Types.ObjectId;
  is_featured: boolean;
};
