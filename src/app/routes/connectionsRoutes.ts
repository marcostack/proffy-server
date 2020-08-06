import { Router } from 'express';

import Controller from '../controllers/ConnectionsControllers';

const routes = Router();
const controller = new Controller();

routes.get('/', controller.index);
routes.post('/', controller.create);

export default routes;
