import { Router, Request, Response } from 'express';
import db from './database/connection';

const routes = Router();

routes.post('/classes', async (request, response) => {
  const {
    name,
    avatar,
    whatsapp,
    bio,
    subject,
    cost,
    schedule
  } = request.body;

  await db('users').insert({
    name,
    avatar,
    whatsapp,
    bio
  });

  return response.send();

});

export default routes;
