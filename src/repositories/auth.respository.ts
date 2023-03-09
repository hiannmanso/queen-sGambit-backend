import { prisma } from '../configs/database.js'

async function insert(
	email: string,
	password: string,
	username: string,
	date: string
) {
	return prisma.accounts.create({
		data: { email, password, username, last_status: date, rating: '500' },
	})
}

async function getByEmail(email: string) {
	return prisma.accounts.findUnique({ where: { email } })
}
async function getByUsername(username: string) {
	return prisma.accounts.findUnique({ where: { username } })
}
async function getByUserId(userId: number) {
	return prisma.accounts.findUnique({ where: { id: userId } })
}

async function updateLastStatus(userId: number, last_status: string) {
	return prisma.accounts.update({
		where: { id: userId },
		data: { last_status },
	})
}

async function getAll() {
	const result = await prisma.accounts.findMany({
		select: {
			id: true,
			username: true,
			last_status: true,
			rating: true,
		},
	})
	console.log(result)
	return result
}

const authRepository = {
	insert,
	getByEmail,
	getByUsername,
	getByUserId,
	updateLastStatus,
	getAll,
}

export default authRepository
