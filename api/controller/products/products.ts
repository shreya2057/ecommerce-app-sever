import { Request, Response } from "express";
import mongoose from "mongoose";
import cloudinary from "../../config/cloudinary";
import { Categories } from "../../model/products";
import { Product } from "../../model/products";
import { errorResponse, sendResponse } from "../../utils/response";

const get_products = async (req: Request, res: Response) => {
  try {
    const request = await Product.find(
      !!req?.query &&
        (!!req?.query?.title
          ? {
              $or: [
                { title: { $regex: req?.query?.title ?? "", $options: "i" } },
              ],
            }
          : {
              category_id: req?.query?.category_id,
            }),
    );
    return sendResponse(res, "Products data fetch successfully", 200, request);
  } catch (e) {
    console.log(e);
    return errorResponse(res);
  }
};

const get_category_products = async (req: Request, res: Response) => {
  try {
    const ObjectId = mongoose.Types.ObjectId;
    const request = await Product.find({
      category_id: new ObjectId(req?.params?.category_id),
    });
    return sendResponse(res, "Products data fetch successfully", 200, request);
  } catch (e) {
    console.log(e);
    return errorResponse(res);
  }
};

const post_products = async (req: Request, res: Response) => {
  try {
    const cloudinaryResult = await cloudinary.uploader.upload(
      `data:${req?.file?.mimetype};base64,${req?.file?.buffer.toString(
        "base64",
      )}`,
      {
        folder: `category_${req.params.category_id}`,
      },
    );
    const ObjectId = mongoose.Types.ObjectId;
    const categoryExists = await Categories.exists({
      _id: new ObjectId(req.params.category_id),
    });
    if (!categoryExists)
      return sendResponse(res, "Category instance not found", 400);
    const request = new Product({
      ...req?.body,
      image: cloudinaryResult?.secure_url,
      category_id: new ObjectId(req.params.category_id),
      is_featured: false,
    });
    await request.save();
    return sendResponse(res, "Product created successfully", 200, request);
  } catch (e) {
    console.log(e);
    return errorResponse(res);
  }
};

const get_featured_products = async (_: Request, res: Response) => {
  try {
    const request = await Product.find({ is_featured: true });
    res.json({
      message: "Featured product data fetch successfully",
      data: request,
      status: 500,
    });
  } catch (e) {
    console.log(e);
    res.json({ message: "Internal server error", status: 500 });
  }
};

const get_products_details = async (req: Request, res: Response) => {
  try {
    const productExists = await Product.exists({ _id: req?.params?.id });
    if (productExists) {
      const productDetail = await Product.findOne({ _id: req?.params?.id });
      return sendResponse(
        res,
        "Product detail fetched successfully",
        200,
        productDetail,
      );
    } else {
      return sendResponse(res, "Product instance not found", 400);
    }
  } catch (e) {
    console.log(e);
    return errorResponse(res);
  }
};

const edit_products_details = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({ _id: req?.params?.id });
    if (!product) return sendResponse(res, "Product instance not found", 400);
    const category_id = product?.category_id.toString();
    const public_id = product?.image.split("/").pop()?.split(".")[0];
    let cloudinaryResult;
    if (req.file) {
      cloudinaryResult = await cloudinary.uploader.upload(
        `data:${req?.file?.mimetype};base64,${req?.file?.buffer.toString(
          "base64",
        )}`,
        {
          folder: `category_${category_id}`,
          public_id,
        },
      );
    }
    const productDetail = await Product.findOneAndUpdate(
      { _id: req?.params?.id },
      {
        ...req?.body,
        ...(cloudinaryResult && { image: cloudinaryResult.secure_url }),
      },
      { new: true, runValidators: false },
    );
    return sendResponse(
      res,
      "Product detail edited successfully",
      200,
      productDetail,
    );
  } catch (e) {
    console.log(e);
    return errorResponse(res);
  }
};

export {
  get_products,
  post_products,
  get_featured_products,
  get_products_details,
  get_category_products,
  edit_products_details,
};
