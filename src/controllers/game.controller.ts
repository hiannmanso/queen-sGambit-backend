import { Request, Response } from 'express'
import gameRepository from '../repositories/game.respository.js'
import {
	createAnewGame,
	getHistory,
	getinfoTable,
	movingPiece,
} from '../services/game.service.js'

export async function newGamePOST(req: Request, res: Response) {
	const { authorization } = req.headers
	const { idPlayerTwo }: { idPlayerTwo: number } = req.body
	const { token } = req.params
	console.log(`authorization ${authorization}`)
	console.log(`idplayerTwo ${idPlayerTwo}`)
	console.log(`token`, token)
	const result = await createAnewGame(authorization, idPlayerTwo, token)

	res.status(200).send(result)
}

export async function tableGET(req: Request, res: Response) {
	const { authorization } = req.headers
	const { token } = req.params
	const result = await getinfoTable(token, authorization)

	res.status(200).send(result)
}

export async function movimentPieceUPDATE(req: Request, res: Response) {
	const { piece, sqToGo } = req.body
	const { authorization } = req.headers
	const { tokenGame } = req.params
	console.log(piece, sqToGo, authorization, tokenGame)
	const result = await movingPiece(piece, sqToGo, authorization, tokenGame)

	res.status(200).send(result)
}

export async function historyGET(req: Request, res: Response) {
	const { tokenGame } = req.params

	const result = await getHistory(tokenGame)

	res.status(200).send(result)
}
