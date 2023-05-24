import { Router } from "express";
import petsController from "../controllers/pets.controller.js";
import { validatePetMiddleware, validatePetMiddlewareUpdate } from "../middlewares/pet.middleware.js";

import PetController from '../controllers/pets.controller.js'

const routes = Router();

routes.post('/', validatePetMiddleware, PetController.create)
routes.get('/', PetController.list)
routes.get('/:id', PetController.listById)
routes.put('/:id',validatePetMiddlewareUpdate, petsController.updateById)
routes.delete('/:id', PetController.deleteById)

export { routes as petRoutes };