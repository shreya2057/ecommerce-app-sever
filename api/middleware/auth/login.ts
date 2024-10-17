import { Request, Response } from "express";
import { loginSchema } from "../../schema/auth/login_schema";
import { sendResponse } from "../../utils/response";

export const login_validation = (
  req: Request,
  res: Response,
  next: () => void
) => {
  const request = loginSchema.validate(req.body, { abortEarly: false });
  if (request.error) {
    return sendResponse(
      res,
      request.error.details.map(({ message }) => message),
      400
    );
  }
};
