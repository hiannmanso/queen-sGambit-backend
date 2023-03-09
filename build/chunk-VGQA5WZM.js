import {
  historyGET,
  movimentPieceUPDATE,
  newGamePOST,
  tableGET
} from "./chunk-GPSKDD2X.js";

// src/routers/game.router.ts
import { Router } from "express";
var gameRouter = Router();
gameRouter.post("/game/:token", newGamePOST);
gameRouter.get("/game/:token", tableGET);
gameRouter.put("/game/:tokenGame", movimentPieceUPDATE);
gameRouter.get("/history/:tokenGame", historyGET);
var game_router_default = gameRouter;

export {
  game_router_default
};
