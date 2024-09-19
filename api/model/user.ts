import mongoose from "mongoose";
import { UserRegistrationType } from "../types/auth";

const user_schema = new mongoose.Schema<UserRegistrationType>({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: String,
    required: true,
  },
  profile_picture: {
    type: String,
    required: false,
  },
  is_verified: {
    type: Boolean,
  },
  role: {
    type: String,
  },
});

export const User = mongoose.model("user", user_schema);
