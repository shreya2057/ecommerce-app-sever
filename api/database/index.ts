import mongoose from "mongoose";
import { DB_CONFIG } from "../config";
export const db_connection = async () => {
  try {
    const url = DB_CONFIG();
    await mongoose.connect(url);
    console.log("MongoDB connected successfully");
  } catch (e) {
    console.log(e);
  }
};
