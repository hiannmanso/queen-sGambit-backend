import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export function decodeToken(tokenController: string) {
	const token = tokenController?.split('Bearer ').join('')
	let infoToken: any
	jwt.verify(token, process.env.JWT_KEY, (err: any, decoded: any) => {
		if (err) throw { status: 400, message: `Invalid token ${token}` }
		else infoToken = decoded
	})

	return infoToken
}

export function generateToken(userID: number) {
	return jwt.sign({ userID }, process.env.JWT_KEY, {
		expiresIn: process.env.JWT_EXPIRATION,
	})
}

export function getUserIDbyToken(authorization: any) {
	const checkToken = decodeToken(authorization)
	if (!checkToken) {
		throw {
			status: 404,
			message: `token not valid`,
		}
	}
	return checkToken
}
