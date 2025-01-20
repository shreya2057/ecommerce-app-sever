import { Request, Response } from "express";
import { errorResponse, sendResponse } from "../../utils/response";
import { Product } from "../../model/products";
import { Cart } from "../../model/orders";
import mongoose from "mongoose";

export const add_to_cart = async (req: Request, res: Response) => {
  try {
    const productExists = await Product.exists({ _id: req?.body?.product });
    if (!productExists)
      return sendResponse(res, "Product instance does not exists", 400);
    const ObjectId = mongoose.Types.ObjectId;
    const carts = new Cart({
      product: ObjectId.createFromHexString(req.body.product),
      number: req?.body?.number,
      user: ObjectId.createFromHexString(req?.body?.user),
    });
    await carts.save();
    return sendResponse(res, "Items added to cart successfully", 200, carts);
  } catch (e) {
    console.log(e);
    errorResponse(res);
  }
};
