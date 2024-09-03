import { Request, Response } from "express";
import { Product } from "../model/products";
import cloudinary from "../config/cloudinary";
import { Categories } from "../model/categories";
import mongoose from "mongoose";

const post_products = async (req: Request, res: Response) => {
  try {
    const cloudinaryResult = await cloudinary.uploader.upload(
      `data:${req?.file?.mimetype};base64,${req?.file?.buffer.toString(
        "base64"
      )}`,
      {
        folder: `category_${req.params.category_id}`,
      }
    );

    const ObjectId = mongoose.Types.ObjectId;

    const findCategory = await Categories.findOne({
      _id: new ObjectId(req.params.category_id),
    });
    if (!!findCategory) {
      const request = new Product({
        ...req?.body,
        image: cloudinaryResult?.secure_url,
        category: req.params.category_id,
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
    res.json({ message: "Internal server error", status: 500 });
  }
};

export { post_products };
