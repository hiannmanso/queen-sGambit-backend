import { Router } from 'express'
import 'express-async-errors'
import authRouter from './auth.router.js'
import convitesRouter from './convites.router.js'
import gameRouter from './game.router.js'

const router = Router()
router.use(authRouter)
router.use(gameRouter)
router.use(convitesRouter)
export default router
