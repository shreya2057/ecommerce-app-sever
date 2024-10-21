import { Request, Response } from "express";
import { User } from "../model/user";
import { otp_schema } from "../schema/otp_schema";

export const otp_validation = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  const request = otp_schema.validate(req?.body);
  if (request.error) {
    res.json({
      message: request?.error?.details?.map((detail) => detail.message),
      status: 400,
    });
  } else {
    const emailExits = await User.exists({ email: req?.body?.email });
    if (emailExits) {
      next();
    } else {
      res.json({ message: "User not found", status: 400 });
      return;
    }
  }
};
