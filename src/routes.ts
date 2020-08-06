import { Router, Request, Response } from 'express';

const routes = Router();

routes.post('/users', (request: Request, response: Response) => {
  console.log(request.body);


  const users = [
    {name: "Marcos"},
    {name: "Maria"},
  ]

  return response.status(200).json(users)
});

export default routes;
