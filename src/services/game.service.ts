import { decodeToken } from '../utils/token.js'
import { v4 as uuidv4 } from 'uuid'
import gameRepository from '../repositories/game.respository.js'
import { piece } from '../interfaces/gamie.intervace.js'

export async function createAnewGame(
	tokenOne: string,
	idPlayerTwo: number,
	token: string
) {
	const infoFirstToken = decodeToken(tokenOne)

	const result = await gameRepository.createNewGame(
		Number(infoFirstToken.userID),
		idPlayerTwo,
		token
	)
	return result
}
export async function getinfoTable(token: string, authorization: string) {
	const infotoken = decodeToken(authorization)
	const result = await gameRepository.getTable(token, infotoken.userID)

	return result
}

export async function movingPiece(
	piece: piece,
	sqToGo: piece,
	authorization: string,
	tokenGame: string
) {
	const infotoken = decodeToken(authorization)
	const infoGame = await gameRepository.getTable(tokenGame, infotoken.userID)
	// console.log(infoGame)
	// console.log(sqToGo)
	let nextPlayer = null
	if (infotoken.userID == infoGame.first_player_id) {
		nextPlayer = infoGame.second_player_id
	} else {
		nextPlayer = infoGame.first_player_id
	}
	if (infotoken.userID !== infoGame.time_to_play) {
		throw {
			status: 404,
			message: `it's not your turn to play`,
		}
	}

	const result = await gameRepository.makeaNewMove(piece, sqToGo)
	if (!result) {
		throw {
			status: 404,
			message: `Error in make a new move`,
		}
	}
	const changeTimeToPlay = await gameRepository.timeToPlay(
		tokenGame,
		nextPlayer
	)
	const date = new Date()
	const dateNow = date.valueOf()
	const saveMoveHistory = await gameRepository.newMoveHistory(
		piece,
		sqToGo,
		tokenGame,
		String(dateNow)
	)

	return result
}

export async function getHistory(token: string) {
	const result = await gameRepository.getHistory(token)

	return result
}

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjMsImlhdCI6MTY2MDIzMzcwNywiZXhwIjoxNjYwMzIwMTA3fQ.l7RzW8ZTwKNq5XyfD2lWxWhBPiO2eOoT1cICPT3Spw4

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsImlhdCI6MTY2MDIzMzcyNSwiZXhwIjoxNjYwMzIwMTI1fQ.ceLTVpcOtwNPhGKp6NFxa1y4t9WGeKxXfeGLjdCXRq4
