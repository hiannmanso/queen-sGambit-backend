import { Request, Response } from 'express'
import { user } from '../interfaces/auth.interface.js'
import { listPlayersOnline, signIN, signUp, updateStatusLogin } from '../services/auth.service.js'
import { decodeToken } from '../utils/token.js'

export async function signupPOST(req: Request, res: Response) {
	const { email, password, username }: user = req.body
	console.log(email,password,username)

	await signUp(email, password, username)
	res.status(201).send(`Your account have been created!`)
}

export async function signinGET(req: Request, res: Response) {
	const { email, password }: user = req.body
	const token = await signIN(email, password)

	res.status(200).send(token)
}

export async function statusLoginPUT(req: Request, res: Response) {
	const { authorization } = req.headers
	const result = await updateStatusLogin(authorization)

	res.status(200).send(result)
}
export async function listParticipantsGET(req: Request, res: Response) {
	
	const result = await listPlayersOnline()
	res.status(200).send(result)
}
