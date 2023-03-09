import "../chunk-JUWXSDKJ.js";

// src/middlewares/validateToken.ts
function validateSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(422).send(error.details.map((detail) => detail.message));
    }
    next();
  };
}
export {
  validateSchema
};
