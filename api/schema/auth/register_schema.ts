import Joi from "joi";
import { UserRegistrationType } from "../../types/auth";

export const registerSchema = Joi.object<UserRegistrationType>({
  full_name: Joi.string()
    .required()
    .pattern(/^(?:\S+\s+){1,}\S+$/, "contains at least two words")
    .messages({
      "string.empty": "Full name cannot be empty",
      "string.pattern.name": "Full name must contain at least two words",
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email cannot be empty",
      "string.email": "Email is not valid",
    }),
  date_of_birth: Joi.string().required().messages({
    "string.empty": "Date of birth cannot be empty",
  }),
  password: Joi.string().required().messages({
    "string.empty": "password cannot be empty",
  }),
  phone_number: Joi.string().required().messages({
    "string.empty": "Phone number cannot be empty",
  }),
  confirm_password: Joi.string()
    .required()
    .equal(Joi.ref("password"))
    .messages({
      "string.empty": "Confirm password cannot be empty",
      "any.only": "Password and confirm password does not match",
    }),
});
