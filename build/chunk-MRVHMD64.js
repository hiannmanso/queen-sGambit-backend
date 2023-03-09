import {
  listPlayersOnline,
  signIN,
  signUp,
  updateStatusLogin
} from "./chunk-B57DYHCP.js";

// src/controllers/auth.controller.ts
async function signupPOST(req, res) {
  const { email, password, username } = req.body;
  await signUp(email, password, username);
  res.status(201).send(`Your account have been created!`);
}
async function signinGET(req, res) {
  const { email, password } = req.body;
  const token = await signIN(email, password);
  res.status(200).send(token);
}
async function statusLoginPUT(req, res) {
  const { authorization } = req.headers;
  const result = await updateStatusLogin(authorization);
  res.status(200).send(result);
}
async function listParticipantsGET(req, res) {
  const result = await listPlayersOnline();
  res.status(200).send(result);
}

export {
  signupPOST,
  signinGET,
  statusLoginPUT,
  listParticipantsGET
};
