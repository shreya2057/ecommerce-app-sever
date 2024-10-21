import { Request, Response } from "express";
import { errorResponse, sendResponse } from "../../utils/response";
import { User } from "../../model/user";
import bcrypt from "bcrypt";

export const register_controller = async (req: Request, res: Response) => {
  try {
    const userExists = await User.exists({ email: req?.body?.email });
    if (userExists)
      return sendResponse(res, "User with this email already exists", 400);

    const saltRounds = 10;
    const password = await bcrypt.hash(req?.body?.password, saltRounds);
    const request = new User({
      ...req?.body,
      password,
      is_verified: false,
      role: "customer",
    });

    await request.save();
    return sendResponse(res, "User created successfully", 200, {
      email: request?.email,
    });
  } catch (e) {
    console.log(e);
    return errorResponse(res);
  }
};
