import {
  game_respository_default
} from "./chunk-RZFE4QYG.js";
import {
  decodeToken
} from "./chunk-NMQBDTHZ.js";

// src/services/game.service.ts
async function createAnewGame(tokenOne, idPlayerTwo, token) {
  const infoFirstToken = decodeToken(tokenOne);
  const result = await game_respository_default.createNewGame(
    Number(infoFirstToken.userID),
    idPlayerTwo,
    token
  );
  return result;
}
async function getinfoTable(token, authorization) {
  const infotoken = decodeToken(authorization);
  const result = await game_respository_default.getTable(token, infotoken.userID);
  return result;
}
async function movingPiece(piece, sqToGo, authorization, tokenGame) {
  const infotoken = decodeToken(authorization);
  const infoGame = await game_respository_default.getTable(tokenGame, infotoken.userID);
  let nextPlayer = null;
  if (infotoken.userID == infoGame.first_player_id) {
    nextPlayer = infoGame.second_player_id;
  } else {
    nextPlayer = infoGame.first_player_id;
  }
  if (infotoken.userID !== infoGame.time_to_play) {
    throw {
      status: 404,
      message: `it's not your turn to play`
    };
  }
  const result = await game_respository_default.makeaNewMove(piece, sqToGo);
  if (!result) {
    throw {
      status: 404,
      message: `Error in make a new move`
    };
  }
  const changeTimeToPlay = await game_respository_default.timeToPlay(
    tokenGame,
    nextPlayer
  );
  const date = /* @__PURE__ */ new Date();
  const dateNow = date.valueOf();
  const saveMoveHistory = await game_respository_default.newMoveHistory(
    piece,
    sqToGo,
    tokenGame,
    String(dateNow)
  );
  return result;
}
async function getHistory(token) {
  const result = await game_respository_default.getHistory(token);
  return result;
}

export {
  createAnewGame,
  getinfoTable,
  movingPiece,
  getHistory
};
