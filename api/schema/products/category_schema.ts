import Joi from "joi";
import { CategoryType } from "../../types/product";

export const category_schema = Joi.object<CategoryType>({
  name: Joi.string()
    .required()
    .messages({ "string.empty": "Category name cannot be empty" }),
});
