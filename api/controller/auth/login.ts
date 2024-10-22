import { Request, Response } from "express";
import { errorResponse, sendResponse } from "../../utils/response";
import { User } from "../../model/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login_controller = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body?.email });

    if (!user) return sendResponse(res, "User does not exists", 400);
    if (!user?.is_verified)
      return sendResponse(res, "User is not verified", 403);

    // Password match check
    const passwordMatch = bcrypt.compare(req.body?.password, user?.password);
    if (!passwordMatch)
      return sendResponse(res, "Incorrect user credentials", 401);

    // Token generation
    const access_key = process.env.access_secretKey ?? "";
    const refresh_key = process.env.refresh_secretKey ?? "";

    const tokenDetails = {
      email: user?.email,
      id: user?._id,
      name: user?.full_name,
      role: user?.role,
    };

    const access_token = jwt.sign(tokenDetails, access_key, {
      expiresIn: 60 * 7,
    });
    const refresh_token = jwt.sign(tokenDetails, refresh_key, {
      expiresIn: 60 * 7,
    });

    sendResponse(res, "Logged in Successfully", 200, {
      access_token,
      refresh_token,
    });
  } catch (e) {
    console.log(e);
    return errorResponse(res);
  }
};
