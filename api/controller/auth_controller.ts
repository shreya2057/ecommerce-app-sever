import { Request, Response } from "express";
import Mail from "nodemailer/lib/mailer";
import { transport } from "../config/nodemailer";
import { OTP } from "../model/otp";
import { User } from "../model/user";
import randomstring from "randomstring";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registration_controller = async (req: Request, res: Response) => {
  try {
    const saltRounds = 10;
    const password = await bcrypt.hash(req?.body?.password, saltRounds);
    const request = new User({
      ...req?.body,
      password,
      is_verified: false,
      role: "customer",
    });
    await request.save();
    res.json({
      message: "User created successfully",
      status: 200,
      data: request,
    });
  } catch (e) {
    res.json({ message: "Internal Server error", status: 500 });
  }
};

export const otp_send_controller = async (req: Request, res: Response) => {
  try {
    const emailExits = await OTP.exists({ email: req?.body?.email });
    if (emailExits) {
      res.json({ message: "OTP already sent", status: 400 });
      return;
    } else {
      const otp = randomstring.generate({
        length: 6,
        charset: "numeric",
      });
      const request = new OTP({ ...req?.body, otp, createdAt: new Date() });
      const mailOptions: Mail.Options = {
        from: process.env.user_email,
        to: req?.body?.email,
        subject: "Email Verification",
        html: `
          <!DOCTYPE html>
          <html lang="en">
            <body>
                <p style="font-weight: bold;">Hello!</p>
                <p>Please use OTP to verify your account:</p>
                <p style="font-size: 20px; font-weight: bold;">${otp}</p>
                <p>Note: Please do not share your otp with anyone.</p>
            </body>
          </html>
        `,
      };
      await request.save();
      await transport.sendMail(mailOptions);
      res.json({ message: "OTP sent successfully", status: 200 });
    }
  } catch (e) {
    res.json({
      message: "Internal server error",
      status: 500,
    });
  }
};

export const otp_verify_controller = async (req: Request, res: Response) => {
  try {
    const otpExists = await OTP.exists({
      otp: req?.body?.otp,
      email: req?.body?.email,
    });
    if (otpExists) {
      await User.findOneAndUpdate(
        { email: req?.body?.email },
        { is_verified: true }
      );
      await OTP.findOneAndDelete({
        email: req?.body?.email,
        otp: req?.body?.otp,
      });
      res.json({ message: "Account successfully verified", status: 200 });
    } else {
      res.json({ message: "Otp expired", status: 400 });
    }
  } catch (e) {
    res.json({ message: "Internal server error", status: 500 });
  }
};

export const login_controller = async (req: Request, res: Response) => {
  try {
    const access_key = process.env.access_secretKey ?? "";
    const refresh_key = process.env.refresh_secretKey ?? "";

    const access_token = jwt.sign({ ...req?.body }, access_key, {
      expiresIn: 60 * 7,
    });

    const refresh_token = jwt.sign({ ...req?.body }, refresh_key, {
      expiresIn: 60 * 60,
    });
    res.json({
      message: "Logged in successfully",
      status: 200,
      data: {
        access_token,
        refresh_token,
      },
    });
  } catch (e) {
    console.log(e);
    res.json({ message: "Internal server error", status: 500 });
  }
};
