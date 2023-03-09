// src/middlewares/handdleError.ts
function handdleError(error, req, res, next) {
  console.log(error);
  if (error) {
    return res.status(error.status).send(error.message);
  }
  res.status(500);
}

export {
  handdleError
};
