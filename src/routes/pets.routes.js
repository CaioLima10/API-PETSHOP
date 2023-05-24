import { Router } from "express";
import PetsController from "../controllers/pets.controller.js";
import { validatePetMiddleware, validatePetMiddlewareUpdate } from "../middlewares/pets.middleware.js";

const routes = Router();

routes.post('/', validatePetMiddleware, PetsController.create)
routes.get('/', PetsController.list)
routes.get('/:id',PetsController.listById)
routes.put('/:id', validatePetMiddlewareUpdate )
routes.delete('/:id', )

export { routes as petRoutes };