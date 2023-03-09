import {
  convite_repository_default
} from "./chunk-4UVJFIZ7.js";
import {
  decodeToken
} from "./chunk-NMQBDTHZ.js";

// src/services/convite.service.ts
async function createANewConvite(authorization, userId, token) {
  const infoToken = decodeToken(authorization);
  const date = /* @__PURE__ */ new Date();
  const dateNow = date.valueOf();
  const result = await convite_repository_default.createNewConvite(
    Number(infoToken.userID),
    Number(userId),
    String(dateNow),
    String(token)
  );
  return result;
}
async function showMyConvites(authorization) {
  const infoToken = decodeToken(authorization);
  const result = convite_repository_default.findMyConvites(Number(infoToken.userID));
  return result;
}
async function showMyInvites(authorization) {
  const infoToken = decodeToken(authorization);
  const result = convite_repository_default.findInviteConvites(
    Number(infoToken.userID)
  );
  return result;
}
async function conviteAcepted(authorization, conviteId, token) {
  const infoToken = decodeToken(authorization);
  const result = convite_repository_default.aceptConvite(conviteId, token);
  return result;
}
async function conviteRejected(authorization, conviteId) {
  const infoToken = decodeToken(authorization);
  const result = convite_repository_default.rejectConvite(conviteId);
  return result;
}

export {
  createANewConvite,
  showMyConvites,
  showMyInvites,
  conviteAcepted,
  conviteRejected
};
