import Joi from "joi";
import { UserLoginType } from "../../types/auth";

export const loginSchema = Joi.object<UserLoginType>({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email cannot be empty",
      "string.email": "Email is not valid",
    }),
  password: Joi.string().required().messages({
    "string.empty": "password cannot be empty",
  }),
});
