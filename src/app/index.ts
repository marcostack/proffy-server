import express, { json } from 'express';
import cors from 'cors';

import routes from './routes';

const app = express();

app.use(cors());
app.use(json());
app.use(routes);

export default app;
