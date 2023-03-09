// src/configs/database.ts
import pkg from "@prisma/client";
var { PrismaClient } = pkg;
console.log("Postgres database connected.");
var prisma = new PrismaClient();

export {
  prisma
};
