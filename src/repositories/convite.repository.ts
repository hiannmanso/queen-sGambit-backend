import { prisma } from '../configs/database.js'

async function createNewConvite(
	from: number,
	to: number,
	date: string,
	token: string
) {
	return prisma.invites.create({
		data: { from, to, last_status: date, status_invite: 'pending', token },
	})
}
async function findMyConvites(userId: number) {
	return prisma.invites.findMany({
		where: { to: userId },
		include: {
			accounts_accountsToinvites_from: {
				select: { username: true, rating: true },
			},
			accounts_accountsToinvites_to: {
				select: { username: true, rating: true },
			},
		},
	})
}

async function findInviteConvites(userId: number) {
	return prisma.invites.findMany({
		where: { from: userId },
		include: {
			accounts_accountsToinvites_from: {
				select: { username: true, rating: true },
			},
			accounts_accountsToinvites_to: {
				select: { username: true, rating: true },
			},
		},
	})
}
async function aceptConvite(id: number, token: string) {
	return prisma.invites.update({
		where: { id },
		data: { status_invite: 'acepted', token },
	})
}
async function rejectConvite(id: number) {
	return prisma.invites.delete({ where: { id } })
}

const conviteRepository = {
	createNewConvite,
	findMyConvites,
	aceptConvite,
	rejectConvite,
	findInviteConvites,
}

export default conviteRepository
