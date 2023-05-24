import { Router } from "express";
import ProprietarioController from '../controllers/proprietario.controller.js';
import { validateProprietarioMiddleware, validateProprietarioMiddlewareUpdate } from '../middlewares/proprietario.middleware.js'

const routes = Router();

routes.post('/', validateProprietarioMiddleware, ProprietarioController.create);
routes.get('/', ProprietarioController.list);
routes.get('/:id', ProprietarioController.listById);
routes.get('/:id/pets', ProprietarioController.listPetsProprietario);
routes.put('/:id',validateProprietarioMiddlewareUpdate, ProprietarioController.updateById)
routes.delete('/:id', ProprietarioController.deleteById);


export { routes as proprietarioRoutes };

