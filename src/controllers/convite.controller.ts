import { Request, Response } from 'express'
import {
	conviteAcepted,
	conviteRejected,
	createANewConvite,
	showMyConvites,
	showMyInvites,
} from '../services/convite.service.js'

export async function newConvitePOST(req: Request, res: Response) {
	const { authorization } = req.headers
	const { userId, token } = req.body
	const result = await createANewConvite(authorization, userId, token)
	res.status(200).send(`Convite sended.${result}`)
}

export async function myConvitesGET(req: Request, res: Response) {
	const { authorization } = req.headers

	const result = await showMyConvites(authorization)

	res.status(200).send(result)
}
export async function myInvatesGET(req: Request, res: Response) {
	const { authorization } = req.headers

	const result = await showMyInvites(authorization)

	res.status(200).send(result)
}

export async function aceptConviteUPDATE(req: Request, res: Response) {
	const { authorization } = req.headers
	const { conviteId, token } = req.body
	const result = await conviteAcepted(authorization, conviteId, token)
	res.status(200).send(result)
}
export async function rejectConviteDELETE(req: Request, res: Response) {
	const { authorization } = req.headers
	const { conviteId } = req.body
	const result = await conviteRejected(authorization, conviteId)
	res.status(200).send(result)
}
