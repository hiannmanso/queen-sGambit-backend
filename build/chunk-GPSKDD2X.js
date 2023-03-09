import {
  createAnewGame,
  getHistory,
  getinfoTable,
  movingPiece
} from "./chunk-G4RSAYMV.js";

// src/controllers/game.controller.ts
async function newGamePOST(req, res) {
  const { authorization } = req.headers;
  const { idPlayerTwo } = req.body;
  const { token } = req.params;
  console.log(`authorization ${authorization}`);
  console.log(`idplayerTwo ${idPlayerTwo}`);
  console.log(`token`, token);
  const result = await createAnewGame(authorization, idPlayerTwo, token);
  res.status(200).send(result);
}
async function tableGET(req, res) {
  const { authorization } = req.headers;
  const { token } = req.params;
  const result = await getinfoTable(token, authorization);
  res.status(200).send(result);
}
async function movimentPieceUPDATE(req, res) {
  const { piece, sqToGo } = req.body;
  const { authorization } = req.headers;
  const { tokenGame } = req.params;
  console.log(piece, sqToGo, authorization, tokenGame);
  const result = await movingPiece(piece, sqToGo, authorization, tokenGame);
  res.status(200).send(result);
}
async function historyGET(req, res) {
  const { tokenGame } = req.params;
  const result = await getHistory(tokenGame);
  res.status(200).send(result);
}

export {
  newGamePOST,
  tableGET,
  movimentPieceUPDATE,
  historyGET
};
