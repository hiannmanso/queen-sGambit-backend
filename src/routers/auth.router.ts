import { Router } from 'express'
import {
	listParticipantsGET,
	signinGET,
	signupPOST,
	statusLoginPUT,
} from '../controllers/auth.controller.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { authSchema } from '../schemas/auth.schema.js'
import { signInSchema } from '../schemas/signin.schema.js'

const authRouter = Router()

authRouter.post('/signup', validateSchema(authSchema), signupPOST)
authRouter.post('/signin', validateSchema(signInSchema), signinGET)
authRouter.put('/statusLogin', statusLoginPUT)
authRouter.get('/participants',listParticipantsGET)
export default authRouter
