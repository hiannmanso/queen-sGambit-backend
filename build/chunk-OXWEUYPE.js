import {
  auth_respository_default
} from "./chunk-DCPHMVHK.js";
import {
  decodeToken,
  generateToken
} from "./chunk-NMQBDTHZ.js";

// src/services/auth.service.ts
import bcrypt from "bcrypt";
async function signUp(email, password, username) {
  const checkEmailIsValid = await auth_respository_default.getByEmail(email);
  console.log(email, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  if (checkEmailIsValid) {
    throw {
      status: 401,
      message: `This email is already in use.`
    };
  }
  const checkUsernameIsValid = await auth_respository_default.getByUsername(username);
  if (checkUsernameIsValid) {
    throw {
      status: 401,
      message: `This username is already in use.`
    };
  }
  const date = /* @__PURE__ */ new Date();
  const dateNow = date.valueOf();
  console.log(dateNow);
  await auth_respository_default.insert(
    email,
    bcrypt.hashSync(password, 10),
    username,
    String(dateNow)
  );
}
async function signIN(email, password) {
  const checkEmailIsValid = await auth_respository_default.getByEmail(email);
  if (!checkEmailIsValid) {
    throw {
      status: 404,
      message: `This email  is not registered.`
    };
  }
  if (!bcrypt.compareSync(password, checkEmailIsValid.password)) {
    throw {
      status: 406,
      message: `Incorrect password or email.`
    };
  }
  const token = generateToken(checkEmailIsValid.id);
  await updateStatusLogin(`Bearer ${token}`);
  return token;
}
async function updateStatusLogin(token) {
  const infotoken = decodeToken(token);
  const checkAccountExist = auth_respository_default.getByUserId(infotoken.userID);
  const date = /* @__PURE__ */ new Date();
  const dateNow = date.valueOf();
  if (!checkAccountExist) {
    throw {
      status: 404,
      message: `Account not found`
    };
  }
  const result = await auth_respository_default.updateLastStatus(
    infotoken.userID,
    String(dateNow)
  );
  return result;
}
async function listPlayersOnline() {
  const date = /* @__PURE__ */ new Date();
  const dateNow = date.valueOf();
  const result = [];
  const players = await auth_respository_default.getAll();
  console.log(players);
  players.map((item) => {
    if (Number(item.last_status) + 3e5 >= dateNow) {
      result.push(item);
    }
  });
  return result;
}

export {
  signUp,
  signIN,
  updateStatusLogin,
  listPlayersOnline
};
