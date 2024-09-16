import { Request, Response } from "express";
import { authSchema } from "../schema/auth_schema";
import { User } from "../model/user";

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
