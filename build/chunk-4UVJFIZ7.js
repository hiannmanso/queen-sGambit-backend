import {
  prisma
} from "./chunk-5LVKYVQE.js";

// src/repositories/convite.repository.ts
async function createNewConvite(from, to, date, token) {
  return prisma.invites.create({
    data: { from, to, last_status: date, status_invite: "pending", token }
  });
}
async function findMyConvites(userId) {
  return prisma.invites.findMany({
    where: { to: userId },
    include: {
      accounts_accountsToinvites_from: {
        select: { username: true, rating: true }
      },
      accounts_accountsToinvites_to: {
        select: { username: true, rating: true }
      }
    }
  });
}
async function findInviteConvites(userId) {
  return prisma.invites.findMany({
    where: { from: userId },
    include: {
      accounts_accountsToinvites_from: {
        select: { username: true, rating: true }
      },
      accounts_accountsToinvites_to: {
        select: { username: true, rating: true }
      }
    }
  });
}
async function aceptConvite(id, token) {
  return prisma.invites.update({
    where: { id },
    data: { status_invite: "acepted", token }
  });
}
async function rejectConvite(id) {
  return prisma.invites.delete({ where: { id } });
}
var conviteRepository = {
  createNewConvite,
  findMyConvites,
  aceptConvite,
  rejectConvite,
  findInviteConvites
};
var convite_repository_default = conviteRepository;

export {
  convite_repository_default
};
