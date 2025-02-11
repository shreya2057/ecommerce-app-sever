import { Request, Response } from "express";
import { errorResponse, sendResponse } from "../../utils/response";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JwtPayloadWithId } from "../../types/jwt";

export const refresh_token_controller = (req: Request, res: Response) => {
  try {
    const refresh_token = req?.body?.refresh;
    const access_key = process.env.access_secretKey ?? "";
    const refresh_key = process.env.refresh_secretKey ?? "";

    if (!refresh_token) return sendResponse(res, "Invalid refresh token", 400);

    jwt.verify(
      refresh_token,
      refresh_key,
      (err: jwt.VerifyErrors | null, decoded?: JwtPayload | string) => {
        if (err) {
          console.log(err);
          return sendResponse(res, "Invalid refresh token", 400);
        }

        const user = decoded as JwtPayloadWithId;
        const access_token = jwt.sign({ _id: user.id }, access_key, {
          expiresIn: "7m",
        });

        return sendResponse(res, "Token refreshed successfully", 200, {
          access_token,
        });
      },
    );
  } catch (e) {
    console.error(e);
    return errorResponse(res);
  }
};
