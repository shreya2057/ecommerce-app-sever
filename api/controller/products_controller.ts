import { Request, Response } from "express";
import { Product } from "../model/products";
import cloudinary from "../config/cloudinary";

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
  } catch (e) {
    console.log(e);
    res.json({ message: "Internal server error", status: 500 });
  }
};

export { post_products };
