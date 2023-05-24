import { Router } from "express";

import { petRoutes } from './pets.routes.js'
import { proprietarioRoutes } from './proprietarios.routes.js'

const routes = Router()

routes.use('/proprietarios', proprietarioRoutes)
routes.use('/pets', petRoutes)

export { routes };