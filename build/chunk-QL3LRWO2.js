// src/schemas/auth.schema.ts
import Joi from "joi";
var authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required(),
  confirmPassword: Joi.ref("password"),
  username: Joi.string().required()
});

export {
  authSchema
};
