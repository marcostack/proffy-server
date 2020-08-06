import { Request, Response } from 'express';

import db from '../../database/connection';

class ConnectionsController {
  async index(request: Request, response: Response) {
    const totalConnections = await db('connections').count('* as total');

    const { total } = totalConnections[0];

    return response.json({ total });
  }

  async create(request: Request, response: Response) {
    const { user_id } = request.body;

    try {
      await db('connections').insert({
        user_id
      });

      return response.sendStatus(201);
    } catch (error) {
      return response.sendStatus(400);
    }
  }
}

export default ConnectionsController;
