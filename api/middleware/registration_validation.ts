import { Request, Response } from "express";
import { User } from "../model/user";
import { authSchema } from "../schema/auth_schema";
import { otp_schema } from "../schema/otp_schema";

export const registration_validation = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  const request = authSchema.validate(req.body, { abortEarly: false });
  if (request.error) {
    res.json({
      message: request.error.details?.map((detail) => detail?.message),
      status: 400,
    });
    return;
  } else {
    const userExists = await User.exists({ email: req?.body?.email });
    if (userExists) {
      res.json({ message: "User with email already exist", status: 400 });
      return;
    }

    next();
  }
};

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
