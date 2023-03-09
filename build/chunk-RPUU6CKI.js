import {
  game_router_default
} from "./chunk-VGQA5WZM.js";
import {
  auth_router_default
} from "./chunk-H6H3D5IA.js";
import {
  convites_router_default
} from "./chunk-HF74CDDD.js";

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
