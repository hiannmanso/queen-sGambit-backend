import bcrypt from 'bcrypt'
import dayjs from 'dayjs'
import authRepository from '../repositories/auth.respository.js'
import { decodeToken, generateToken } from '../utils/token.js'

export async function signUp(
	email: string,
	password: string,
	username: string
) {
	const checkEmailIsValid = await authRepository.getByEmail(email)
	console.log(email,'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
	if (checkEmailIsValid) {
		throw {
			status: 401,
			message: `This email is already in use.`,
		}
	}

	const checkUsernameIsValid = await authRepository.getByUsername(username)
	if (checkUsernameIsValid) {
		throw {
			status: 401,
			message: `This username is already in use.`,
		}
	}
	const date = new Date()
	const dateNow = date.valueOf()
	console.log(dateNow)
	await authRepository.insert(
		email,
		bcrypt.hashSync(password, 10),
		username,
		String(dateNow)
	)
}

export async function signIN(email: string, password: string) {
	const checkEmailIsValid = await authRepository.getByEmail(email)
	if (!checkEmailIsValid) {
		throw {
			status: 404,
			message: `This email  is not registered.`,
		}
	}
	if (!bcrypt.compareSync(password, checkEmailIsValid.password)) {
		throw {
			status: 406,
			message: `Incorrect password or email.`,
		}
	}
	const token = generateToken(checkEmailIsValid.id)
	await updateStatusLogin(`Bearer ${token}`)
	return token
}

export async function updateStatusLogin(token) {
	const infotoken = decodeToken(token)
	const checkAccountExist = authRepository.getByUserId(infotoken.userID)

	const date = new Date()
	const dateNow = date.valueOf()

	if (!checkAccountExist) {
		throw {
			status: 404,
			message: `Account not found`,
		}
	}
	const result = await authRepository.updateLastStatus(
		infotoken.userID,
		String(dateNow)
	)
	return result
}

export async function listPlayersOnline() {
	const date = new Date()
	const dateNow = date.valueOf()
	const result = []
	const players = await authRepository.getAll()
	console.log(players)
	players.map((item) => {
		if (Number(item.last_status) + 300000 >= dateNow) {
			result.push(item)
		}
	})

	return result
}
