import { Request, Response } from "express";
import { Categories } from "../model/categories";

const add_categories = async (req: Request, res: Response) => {
  try {
    const request = new Categories({ ...req.body, createdAt: new Date() });
    await request.save();
    res.json({
      message: "Categories created Successfully",
      status: 200,
      data: request,
    });
  } catch (e) {
    console.log(e);
    res.json({ message: "Internal server error", status: 500 });
  }
};

const get_categories = async (_: Request, res: Response) => {
  try {
    const response = await Categories.find();
    res.json({
      message: "Categories data fetch successfully",
      status: 200,
      data: response,
    });
  } catch (e) {
    console.log(e);
    res.json({ message: "Internal server error", status: 500 });
  }
};

export { add_categories, get_categories };
