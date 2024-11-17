import { Request, Response } from "express";
import { category_schema } from "../../schema/products";
import { sendResponse } from "../../utils/response";

export const category_validation = async (
  req: Request,
  res: Response,
  next: () => void,
) => {
  const request = category_schema.validate(req?.body);
  if (request.error) {
    return sendResponse(
      res,
      request?.error?.details?.map(({ message }) => message),
      400,
    );
  } else {
    next();
  }
};
