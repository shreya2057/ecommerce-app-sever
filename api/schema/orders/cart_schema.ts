import Joi from "joi";
import { CartType } from "../../types/orders";

export const cartSchema = Joi.object<CartType>({
  number: Joi.number().required().min(1).messages({
    "number.base": "The quantity must be a valid number.",
    "number.min": "The quantity cannot be zero or less.",
    "any.required": "The quantity cannot be null",
  }),
  product: Joi.string().required().messages({
    "string.empty": "Product id cannot be empty",
  }),
  user: Joi.string().required().messages({
    "string.empty": "user id cannot be empty",
  }),
});
