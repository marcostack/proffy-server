import { Router } from 'express';

import classes from './classesRoutes';
import connections from './connectionsRoutes';

const routes = Router();

routes.use('/classes', classes);
routes.use('/connections', connections);

export default routes;
