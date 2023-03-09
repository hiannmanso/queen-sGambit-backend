import {
  router_default
} from "./chunk-P2K2KRVZ.js";
import {
  handdleError
} from "./chunk-5UGBWJIP.js";

// src/app.ts
import express from "express";
import "express-async-errors";
import cors from "cors";
var server = express();
server.use(cors());
server.use(express.json());
server.use(router_default);
server.use(handdleError);
var app_default = server;

export {
  app_default
};
