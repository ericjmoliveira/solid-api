import { Router } from 'express';

import { makeClubController } from './factories/club-controller';

export const routes = Router();

const clubController = makeClubController();

routes.get('/', (req, res) => res.status(200).json({ message: 'Hello world!' }));

routes.get('/clubs', (req, res) => clubController.getClubs(req, res));
routes.get('/clubs/:id', async (req, res) => clubController.getClub(req, res));
routes.post('/clubs', async (req, res) => clubController.createClub(req, res));
routes.put('/clubs/:id', async (req, res) => clubController.updateClub(req, res));
routes.delete('/clubs/:id', (req, res) => clubController.deleteClub(req, res));
