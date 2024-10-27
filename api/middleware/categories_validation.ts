import { Request, Response } from "express";

export const categories_validation = (
  req: Request,
  res: Response,
  next: () => void,
) => {
  const request = req?.body;
  if (!!!request) {
    res.json({ message: "All fields cannot be null", status: 400 });
  }
  if (!!!request.name) {
    res.json({ message: "Category name cannot be null", status: 400 });
  }
  next();
};
