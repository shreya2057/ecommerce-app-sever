import { Request, Response } from "express";
import { Categories } from "../../model/products";
import { errorResponse, sendResponse } from "../../utils/response";

const add_categories = async (req: Request, res: Response) => {
  try {
    const categoryExists = await Categories.exists({ name: req?.body?.name });
    if (categoryExists)
      return sendResponse(res, "Category name already exists", 409);
    const request = new Categories({
      ...req.body,
      createdAt: new Date(),
      is_active: true,
      is_deleted: false,
    });
    await request.save();
    return sendResponse(res, "Categories created Successfully", 200, request);
  } catch (e) {
    console.log(e);
    return errorResponse(res);
  }
};

const get_categories = async (_: Request, res: Response) => {
  try {
    const response = await Categories.find({
      is_deleted: false,
      is_active: true,
    });
    return sendResponse(
      res,
      "Categories data fetch successfully",
      200,
      response,
    );
  } catch (e) {
    console.log(e);
    return errorResponse(res);
  }
};

const get_all_categories = async (_: Request, res: Response) => {
  try {
    const response = await Categories.find({
      is_deleted: false,
    });
    return sendResponse(
      res,
      "Categories data fetch successfully",
      200,
      response,
    );
  } catch (e) {
    console.log(e);
    return errorResponse(res);
  }
};

const get_deleted_categories = async (_: Request, res: Response) => {
  try {
    const response = await Categories.find({
      is_deleted: true,
    });
    return sendResponse(
      res,
      "Categories data fetch successfully",
      200,
      response,
    );
  } catch (e) {
    console.log(e);
    return errorResponse(res);
  }
};

export {
  add_categories,
  get_categories,
  get_all_categories,
  get_deleted_categories,
};
