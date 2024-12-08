import Joi from "joi";
import { CategoryType } from "../../types/product";

export const category_schema = Joi.object<CategoryType>({
  name: Joi.string()
    .required()
    .messages({ "string.empty": "Category name cannot be empty" }),
});

export const category_update_schema = Joi.object<CategoryType>({
  name: Joi.string()
    .min(1)
    .messages({ "string.min": "Category name cannot be empty" }),
  is_active: Joi.boolean(),
});
