import { Request, Response } from "express";
import { User } from "../model/user";
import { OTP } from "../model/otp";

export const registration_controller = async (req: Request, res: Response) => {
  try {
    const request = new User({ ...req?.body, is_verified: false });
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
      const otp = "34556";
      const request = new OTP({ ...req?.body, otp, createdAt: new Date() });
      await request.save();
      res.json({ message: "OTP sent successfully", status: 200 });
    }
  } catch (e) {
    res.json({
      message: "Internal server error",
      status: 500,
    });
  }
};
