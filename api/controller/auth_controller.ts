import { Request, Response } from "express";
import { User } from "../model/user";

export const registration_controller = async (req: Request, res: Response) => {
  try {
    const request = new User({ ...req?.body, is_verified: false });
    await request.save();
    res.json({
      message: "User created successfully",
      status: 200,
      data: request,
    });
  } catch (e) {
    res.json({ message: "Internal Server error", status: 500 });
  }
};
