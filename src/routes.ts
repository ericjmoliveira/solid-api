import { Router } from 'express';

import { ClubController } from './controllers/club';
import { ClubUseCases } from './use-cases/clubs';
import { PrismaRepository } from './repositories/prisma';
import { prisma } from './lib/prisma';

const prismaRepository = new PrismaRepository(prisma);
const clubUseCases = new ClubUseCases(prismaRepository);
const clubController = new ClubController(clubUseCases);

export const routes = Router();

routes.get('/', (req, res) => res.status(200).json({ message: 'Hello world!' }));

routes.get('/clubs', (req, res) => clubController.getClubs(req, res));
routes.get('/clubs/:id', async (req, res) => clubController.getClub(req, res));
routes.post('/clubs', async (req, res) => clubController.createClub(req, res));
routes.put('/clubs/:id', async (req, res) => clubController.updateClub(req, res));
routes.delete('/clubs/:id', (req, res) => clubController.deleteClub(req, res));
