// src/schemas/signin.schema.ts
import Joi from "joi";
var signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required()
});

export {
  signInSchema
};
