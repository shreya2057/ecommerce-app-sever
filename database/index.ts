import mongoose from "mongoose";
import { DB_CONFIG } from "../config/db";
export const mongodb_connection = async () => {
  try {
    const url = DB_CONFIG();
    await mongoose.connect(url);
    console.log("Database connected successfully");
  } catch (e) {
    console.log(e);
  }
};
