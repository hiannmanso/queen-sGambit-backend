import {
  aceptConviteUPDATE,
  myConvitesGET,
  myInvatesGET,
  newConvitePOST,
  rejectConviteDELETE
} from "./chunk-J4DDEFCD.js";

// src/routers/convites.router.ts
import { Router } from "express";
var convitesRouter = Router();
convitesRouter.post("/convites", newConvitePOST);
convitesRouter.get("/convites", myConvitesGET);
convitesRouter.put("/convites", aceptConviteUPDATE);
convitesRouter.delete("/convites", rejectConviteDELETE);
convitesRouter.get("/invites", myInvatesGET);
var convites_router_default = convitesRouter;

export {
  convites_router_default
};
