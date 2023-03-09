import { NextFunction, Request, Response } from 'express'

export function handdleError(
	error,
	req: Request,
	res: Response,
	next: NextFunction
) {
	console.log(error)
	if (error) {
		return res.status(error.status).send(error.message)
	}
	res.status(500)
}
