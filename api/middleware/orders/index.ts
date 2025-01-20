import { Request, Response } from "express";
import { cartSchema } from "../../schema/orders";
import { sendResponse } from "../../utils/response";

export const cart_validation = (
  req: Request,
  res: Response,
  next: () => void,
) => {
  const request = cartSchema.validate(req?.body);
  if (request?.error) {
    return sendResponse(
      res,
      request?.error?.details?.map(({ message }) => message),
      404,
    );
  } else {
    next();
  }
};
