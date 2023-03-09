import conviteRepository from '../repositories/convite.repository.js'
import { decodeToken } from '../utils/token.js'

export async function createANewConvite(
	authorization: string,
	userId: Number,
	token: String
) {
	const infoToken = decodeToken(authorization)
	const date = new Date()
	const dateNow = date.valueOf()
	const result = await conviteRepository.createNewConvite(
		Number(infoToken.userID),
		Number(userId),
		String(dateNow),
		String(token)
	)
	return result
}

export async function showMyConvites(authorization: string) {
	const infoToken = decodeToken(authorization)

	const result = conviteRepository.findMyConvites(Number(infoToken.userID))

	return result
}
export async function showMyInvites(authorization: string) {
	const infoToken = decodeToken(authorization)

	const result = conviteRepository.findInviteConvites(
		Number(infoToken.userID)
	)

	return result
}

export async function conviteAcepted(authorization, conviteId, token) {
	const infoToken = decodeToken(authorization)
	//VALIDAR SE O PEDIDO É DO USUÁRIO
	const result = conviteRepository.aceptConvite(conviteId, token)
	return result
}

export async function conviteRejected(authorization, conviteId) {
	const infoToken = decodeToken(authorization)
	//VALIDAR SE O PEDIDO É DO USUÁRIO
	const result = conviteRepository.rejectConvite(conviteId)
	return result
}
