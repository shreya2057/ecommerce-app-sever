import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
export const transport = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.user_email,
    pass: process.env.user_password,
  },
});
