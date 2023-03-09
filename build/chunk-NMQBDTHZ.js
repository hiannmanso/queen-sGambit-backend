// src/utils/token.ts
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
function decodeToken(tokenController) {
  const token = tokenController == null ? void 0 : tokenController.split("Bearer ").join("");
  let infoToken;
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err)
      throw { status: 400, message: `Invalid token ${token}` };
    else
      infoToken = decoded;
  });
  return infoToken;
}
function generateToken(userID) {
  return jwt.sign({ userID }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRATION
  });
}
function getUserIDbyToken(authorization) {
  const checkToken = decodeToken(authorization);
  if (!checkToken) {
    throw {
      status: 404,
      message: `token not valid`
    };
  }
  return checkToken;
}

export {
  decodeToken,
  generateToken,
  getUserIDbyToken
};
