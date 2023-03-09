import {
  auth_router_default
} from "./chunk-BER3WF6U.js";
import {
  convites_router_default
} from "./chunk-HF74CDDD.js";
import {
  game_router_default
} from "./chunk-VGQA5WZM.js";

// src/routers/router.ts
import { Router } from "express";
import "express-async-errors";
var router = Router();
router.use(auth_router_default);
router.use(game_router_default);
router.use(convites_router_default);
var router_default = router;

export {
  router_default
};
