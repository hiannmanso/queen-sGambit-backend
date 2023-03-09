import { Router } from 'express'
import {
	historyGET,
	movimentPieceUPDATE,
	newGamePOST,
	tableGET,
} from '../controllers/game.controller.js'

import { validateSchema } from '../middlewares/validateSchema.js'

const gameRouter = Router()

gameRouter.post('/game/:token', newGamePOST)
gameRouter.get('/game/:token', tableGET)
gameRouter.put('/game/:tokenGame', movimentPieceUPDATE)
gameRouter.get('/history/:tokenGame', historyGET)
export default gameRouter
