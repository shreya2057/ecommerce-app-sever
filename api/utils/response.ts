import { Response } from "express";

export const sendResponse = (
  res: Response,
  message: string | string[],
  status: number,
  data?: unknown
) => {
  return res.status(status).json({ message, status, data });
};

export const errorResponse = (res: Response) => {
  return res
    .status(500)
    .json({ message: "Internal server error", status: 500 });
};
