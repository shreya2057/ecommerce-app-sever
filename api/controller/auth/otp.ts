import { Request, Response } from "express";
import randomstring from "randomstring";
import { transport } from "../../config/nodemailer";
import { OTP, User } from "../../model/auth";
import { generateOTPMail } from "../../utils/generateOTPMail";
import { errorResponse, sendResponse } from "../../utils/response";

export const otp_send_controller = async (req: Request, res: Response) => {
  try {
    const userExists = await User.exists({ email: req?.body?.email });
    if (!userExists) return sendResponse(res, "User not found", 400);

    const emailExits = await OTP.exists({ email: req?.body?.email });
    if (emailExits) return sendResponse(res, "OTP already sent", 400);

    const otp = randomstring.generate({ length: 6, charset: "numeric" });
    const request = new OTP({ ...req?.body, otp, createdAt: new Date() });

    await request.save();
    await transport.sendMail(generateOTPMail({ email: req?.body?.email, otp }));

    return sendResponse(res, "OTP sent successfully", 200);
  } catch (e) {
    console.log(e);
    return errorResponse(res);
  }
};

export const otp_verify_controller = async (req: Request, res: Response) => {
  try {
    const emailExits = await User.exists({ email: req?.body?.email });
    if (!emailExits) return sendResponse(res, "User not found", 400);

    const otpExists = await OTP.findOne({
      email: req?.body?.email,
    });

    if (!otpExists) return sendResponse(res, "Otp expired", 400);

    if (otpExists?.otp !== req?.body?.otp)
      return sendResponse(res, "Otp did not match", 400);

    await User.findOneAndUpdate(
      { email: req?.body?.email },
      { is_verified: true },
    );
    await OTP.findOneAndDelete({
      email: req?.body?.email,
      otp: req?.body?.otp,
    });
    sendResponse(res, "Account successfully verified", 200);
  } catch (e) {
    console.log(e);
    errorResponse(res);
  }
};
