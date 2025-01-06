import { Request, Response } from "express";
import { errorResponse, sendResponse } from "../../utils/response";
import jwt from "jsonwebtoken";
import { JwtPayloadWithId } from "../../types/jwt";
import { User } from "../../model/auth";

export const authorizeUser = (
  req: Request,
  res: Response,
  next: () => void,
) => {
  try {
    const access_key = process.env.access_secretKey ?? "";
    const header = req?.headers?.authorization;
    const token = header && header?.split(" ")[1];
    if (!token) return sendResponse(res, "Unauthenicated user", 401);
    jwt.verify(token, access_key, async function (err, decoded) {
      if (err) return sendResponse(res, "Invalid token", 403);
      const user = decoded as JwtPayloadWithId;
      const user_data = await User.findOne({ _id: user?.id });
      if (!user_data?.is_active) return sendResponse(res, "Invalid token", 403);
      req.body.user = user?.id;
      next();
    });
  } catch (e) {
    console.log(e);
    errorResponse(res);
  }
};
