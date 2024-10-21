import mongoose from "mongoose";
import { OTPType } from "../../types/auth";

const otp_schema = new mongoose.Schema<OTPType>({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, required: true, expires: 60 * 3 },
});

export const OTP = mongoose.model("OTP", otp_schema);
