import Joi from "joi";

export const otp_schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email cannot be empty",
      "string.email": "Email is not valid",
    }),
});
