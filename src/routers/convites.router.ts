import { Router } from 'express'
import {
	aceptConviteUPDATE,
	myConvitesGET,
	myInvatesGET,
	newConvitePOST,
	rejectConviteDELETE,
} from '../controllers/convite.controller.js'

const convitesRouter = Router()
convitesRouter.post('/convites', newConvitePOST)
convitesRouter.get('/convites', myConvitesGET)
convitesRouter.put('/convites', aceptConviteUPDATE)
convitesRouter.delete('/convites', rejectConviteDELETE)
convitesRouter.get('/invites', myInvatesGET)

export default convitesRouter
