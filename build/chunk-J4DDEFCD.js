import {
  conviteAcepted,
  conviteRejected,
  createANewConvite,
  showMyConvites,
  showMyInvites
} from "./chunk-NWZD34ES.js";

// src/controllers/convite.controller.ts
async function newConvitePOST(req, res) {
  const { authorization } = req.headers;
  const { userId, token } = req.body;
  const result = await createANewConvite(authorization, userId, token);
  res.status(200).send(`Convite sended.${result}`);
}
async function myConvitesGET(req, res) {
  const { authorization } = req.headers;
  const result = await showMyConvites(authorization);
  res.status(200).send(result);
}
async function myInvatesGET(req, res) {
  const { authorization } = req.headers;
  const result = await showMyInvites(authorization);
  res.status(200).send(result);
}
async function aceptConviteUPDATE(req, res) {
  const { authorization } = req.headers;
  const { conviteId, token } = req.body;
  const result = await conviteAcepted(authorization, conviteId, token);
  res.status(200).send(result);
}
async function rejectConviteDELETE(req, res) {
  const { authorization } = req.headers;
  const { conviteId } = req.body;
  const result = await conviteRejected(authorization, conviteId);
  res.status(200).send(result);
}

export {
  newConvitePOST,
  myConvitesGET,
  myInvatesGET,
  aceptConviteUPDATE,
  rejectConviteDELETE
};
