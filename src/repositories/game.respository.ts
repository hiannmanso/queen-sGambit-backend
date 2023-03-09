import { prisma } from '../configs/database.js'
import { piece } from '../interfaces/gamie.intervace.js'

async function createNewGame(
	first_player_id: number,
	second_player_id: number,
	token: string
) {
	const list = [first_player_id, second_player_id]
	const randomWhitePlayer = list[Math.floor(Math.random() * list.length)]
	await prisma.games.create({
		data: {
			first_player_id,
			second_player_id,
			token,
			white_player: randomWhitePlayer,
			time_to_play: randomWhitePlayer,
		},
	})
	console.log(randomWhitePlayer)
	const result = await createNewTable(token)
	return result
}

async function createNewTable(token) {
	let initialPositions = {
		a8: 'rook-black',
		b8: 'knight-black',
		c8: 'bishop-black',
		d8: 'queen-black',
		e8: 'king-black',
		f8: 'bishop-black',
		g8: 'knight-black',
		h8: 'rook-black',

		a7: 'pawn-black',
		b7: 'pawn-black',
		c7: 'pawn-black',
		d7: 'pawn-black',
		e7: 'pawn-black',
		f7: 'pawn-black',
		g7: 'pawn-black',
		h7: 'pawn-black',

		a2: 'pawn-white',
		b2: 'pawn-white',
		c2: 'pawn-white',
		d2: 'pawn-white',
		e2: 'pawn-white',
		f2: 'pawn-white',
		g2: 'pawn-white',
		h2: 'pawn-white',

		a1: 'rook-white',
		b1: 'knight-white',
		c1: 'bishop-white',
		d1: 'queen-white',
		e1: 'king-white',
		f1: 'bishop-white',
		g1: 'knight-white',
		h1: 'rook-white',
	}
	const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
	let contador = 0
	let table = []
	const tableIndex = []
	for (let line = 8; line >= 1; --line) {
		for (let column = 0; column < columns.length; ++column) {
			const sq = columns[column] + line

			if (initialPositions[sq]) {
				table.push({
					position: sq,
					contains: initialPositions[sq].split('-')[0],
					line,
					column: columns[column],
					index_of_column: columns.indexOf(columns[column]),
					index: contador,
					color: initialPositions[sq].split('-')[1],
					game_token: token,
				})
			} else {
				table.push({
					position: sq,
					contains: '',
					line,
					column: columns[column],
					index_of_column: columns.indexOf(columns[column]),
					color: '',
					index: contador,
					game_token: token,
				})
			}
			contador++
			tableIndex.push(sq)
		}
	}
	await prisma.table.createMany({ data: table })
	console.log('table created')
	return table
}

async function getTable(token: string, userId) {
	const result = await prisma.games.findUnique({
		where: { token },
		include: {
			table: {
				orderBy: {
					id: 'desc',
				},
			},
			game_history: {},
			accounts_accountsTogames_first_player_id: {},
			accounts_accountsTogames_second_player_id: {},
		},
	})
	if (result.white_player == userId) {
		const result2 = await prisma.games.findUnique({
			where: { token },
			include: {
				table: {
					orderBy: {
						id: 'asc',
					},
				},
				game_history: {},
				accounts_accountsTogames_first_player_id: {
					select: { username: true },
				},
				accounts_accountsTogames_second_player_id: {
					select: { username: true },
				},
			},
		})

		return { ...result2, whitePlayer: true }
	}
	return { ...result, whitePlayer: false }
}

async function makeaNewMove(piece: piece, sqToGo: piece) {
	const result = await prisma.table.update({
		where: { id: piece.index },
		data: { contains: '', color: '' },
	})
	const result2 = await prisma.table.update({
		where: { id: sqToGo.index },
		data: { contains: sqToGo.contains, color: sqToGo.color },
	})
	const results = [result, result2]
	return results
}

async function newMoveHistory(
	piece: piece,
	sqToGo: piece,
	token: string,
	date
) {
	const result = await prisma.game_history.create({
		data: {
			final_position: sqToGo.position,
			last_status: date,
			piece: sqToGo.contains,
			starting_position: piece.position,
			game_token: token,
			color: sqToGo.color,
		},
	})
	return result
}
async function getHistory(token: string) {
	const result = await prisma.game_history.findMany({
		where: { game_token: token },
		orderBy: { last_status: 'asc' },
	})
	return result
}
async function timeToPlay(token: string, userId) {
	const result = await prisma.games.update({
		where: { token },
		data: { time_to_play: userId },
	})
	return result
}
const gameRepository = {
	createNewGame,
	makeaNewMove,
	getTable,
	timeToPlay,
	newMoveHistory,
	getHistory,
}

export default gameRepository
