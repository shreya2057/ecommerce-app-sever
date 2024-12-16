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
    const response = await Categories.aggregate([
      {
        $match: { is_deleted: false },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "category_id",
          as: "category_products",
        },
      },
      {
        $addFields: {
          no_of_products: { $size: "$category_products" },
        },
      },
      {
        $project: {
          category_products: 0,
        },
      },
    ]);
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

const update_category = async (req: Request, res: Response) => {
  try {
    const categoryExists = await Categories.exists({
      _id: req?.params?.id,
      is_deleted: false,
    });
    if (!categoryExists)
      return sendResponse(res, "Category id does not exist", 400);
    const request = await Categories.findByIdAndUpdate(
      { _id: req?.params?.id },
      { ...req?.body },
      { new: true, runValidators: false },
    );
    return sendResponse(res, "Category updated successfully", 200, request);
  } catch (e) {
    const err = e as Record<string, unknown>;
    if ("code" in err && err.code === 11000) {
      console.log(err);
      return sendResponse(res, "Category name already exists", 400);
    }
    console.log(err);
    return errorResponse(res);
  }
};

const get_category_detail = async (req: Request, res: Response) => {
  try {
    const category = await Categories.findOne({
      _id: req?.params?.id,
      is_deleted: false,
    });
    if (!category) return sendResponse(res, "Category not found", 400);
    return sendResponse(
      res,
      "Category detail fetch successfully",
      200,
      category,
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
  update_category,
  get_category_detail,
};
