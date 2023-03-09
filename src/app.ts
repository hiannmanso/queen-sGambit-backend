import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import router from './routers/router.js'
import { handdleError } from './middlewares/handdleError.js'

const server = express()

server.use(cors())
server.use(express.json())
server.use(router)
server.use(handdleError)
// ,
export default server
