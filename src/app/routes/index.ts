import { Router } from 'express';

import classes from './classesRoutes';

const routes = Router();

routes.use('/classes', classes);

export default routes;
