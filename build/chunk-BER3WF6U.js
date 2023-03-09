import {
  authSchema
} from "./chunk-QL3LRWO2.js";
import {
  signInSchema
} from "./chunk-UUHJFFGH.js";
import {
  listParticipantsGET,
  signinGET,
  signupPOST,
  statusLoginPUT
} from "./chunk-EF3OXB4N.js";
import {
  validateSchema
} from "./chunk-42O673NC.js";

// src/routers/auth.router.ts
import { Router } from "express";
var authRouter = Router();
authRouter.post("/signup", validateSchema(authSchema), signupPOST);
authRouter.post("/signin", validateSchema(signInSchema), signinGET);
authRouter.put("/statusLogin", statusLoginPUT);
authRouter.get("/participants", listParticipantsGET);
var auth_router_default = authRouter;

export {
  auth_router_default
};
