import Joi from "joi";
import { OTPType } from "../../types/auth";

export const otp_schema = Joi.object<OTPType>({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email cannot be empty",
      "string.email": "Email is not valid",
    }),
  otp: Joi.string(),
});
