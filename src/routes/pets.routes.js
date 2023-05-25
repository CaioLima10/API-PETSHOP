import { Router } from "express";
import PetsController from "../controllers/pets.controller.js";
import { validatePetMiddleware, validatePetMiddlewareUpdate } from "../middlewares/pet.middleware.js";

const routes = Router();

routes.post('/', validatePetMiddleware, PetsController.create)
routes.get('/', PetsController.list)
routes.get('/:id',PetsController.listById)
routes.put('/:id', validatePetMiddlewareUpdate , PetsController.updateById )
routes.delete('/:id', PetsController.deleteById )

export { routes as petRoutes };