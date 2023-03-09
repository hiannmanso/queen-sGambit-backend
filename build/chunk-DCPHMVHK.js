import {
  prisma
} from "./chunk-5LVKYVQE.js";

// src/repositories/auth.respository.ts
async function insert(email, password, username, date) {
  return prisma.accounts.create({
    data: { email, password, username, last_status: date, rating: "500" }
  });
}
async function getByEmail(email) {
  return prisma.accounts.findUnique({ where: { email } });
}
async function getByUsername(username) {
  return prisma.accounts.findUnique({ where: { username } });
}
async function getByUserId(userId) {
  return prisma.accounts.findUnique({ where: { id: userId } });
}
async function updateLastStatus(userId, last_status) {
  return prisma.accounts.update({
    where: { id: userId },
    data: { last_status }
  });
}
async function getAll() {
  const result = await prisma.accounts.findMany({
    select: {
      id: true,
      username: true,
      last_status: true,
      rating: true
    }
  });
  console.log(result);
  return result;
}
var authRepository = {
  insert,
  getByEmail,
  getByUsername,
  getByUserId,
  updateLastStatus,
  getAll
};
var auth_respository_default = authRepository;

export {
  auth_respository_default
};
