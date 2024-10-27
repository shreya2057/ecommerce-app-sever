import { Request, Response } from "express";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinary";
import { Categories } from "../model/categories";
import { Product } from "../model/products";

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
    res.json({
      message: "Products data fetch successfully",
      status: 200,
      data: request,
    });
  } catch (e) {
    console.log(e);
    res.json({ message: "Internal server error", status: 500 });
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

    const findCategory = await Categories.findOne({
      _id: new ObjectId(req.params.category_id),
    });
    if (!!findCategory) {
      const request = new Product({
        ...req?.body,
        image: cloudinaryResult?.secure_url,
        category_id: req.params.category_id,
        category_name: findCategory?.name,
      });

      await request.save();
      res.json({
        message: "Products created successfully",
        status: 200,
        data: request,
      });
    } else {
      res.json({
        message: "Category instance not found",
        status: 400,
      });
    }
  } catch (e) {
    console.log(e);
    res.json({ message: "Internal server error", status: 500 });
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
      res.json({
        message: "Product detail fetched successfully",
        status: 200,
        data: productDetail,
      });
    } else {
      res.json({ message: "Product instance not found", status: 400 });
    }
  } catch (e) {
    console.log(e);
    res.json({ message: "Internal server error", status: 500 });
  }
};

export {
  get_products,
  post_products,
  get_featured_products,
  get_products_details,
};
