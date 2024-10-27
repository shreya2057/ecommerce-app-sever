import { Request, Response } from "express";
import { loginSchema, otp_schema, registerSchema } from "../../schema/auth";
import { sendResponse } from "../../utils/response";

export const login_validation = (
  req: Request,
  res: Response,
  next: () => void,
) => {
  const request = loginSchema.validate(req.body, { abortEarly: false });
  if (request.error) {
    return sendResponse(
      res,
      request.error.details.map(({ message }) => message),
      400,
    );
  } else {
    next();
  }
};

export const register_validation = async (
  req: Request,
  res: Response,
  next: () => void,
) => {
  const request = registerSchema.validate(req?.body, { abortEarly: false });
  if (request?.error) {
    return sendResponse(
      res,
      request?.error?.details?.map(({ message }) => message),
      400,
    );
  } else {
    next();
  }
};

export const otp_validation = async (
  req: Request,
  res: Response,
  next: () => void,
) => {
  const request = otp_schema.validate(req?.body);
  if (request.error) {
    res.json({
      message: request?.error?.details?.map((detail) => detail.message),
      status: 400,
    });
  } else {
    next();
  }
};
