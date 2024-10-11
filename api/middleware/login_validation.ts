import { Request, Response } from "express";
import { User } from "../model/user";
import bcrypt from "bcrypt";

export const login_validation = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  try {
    const user = await User.findOne({ email: req?.body?.email });
    if (user) {
      if (user?.is_verified) {
        const passwordMatch = await bcrypt.compare(
          req?.body?.password,
          user?.password
        );
        if (passwordMatch) {
          next();
        } else {
          res.json({ message: "Password did not match", status: 400 });
        }
      } else {
        res.json({ message: "User is not verified", status: 403 });
      }
    } else {
      res.json({ message: "User does not exist", status: 400 });
    }
  } catch (e) {
    res.json({ message: "Internal server error", status: 500 });
  }
};
