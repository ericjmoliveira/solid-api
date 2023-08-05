import express from 'express';

import { ClubUseCases } from './use-cases/clubs';
import { PrismaRepository } from './repositories/prisma';

import { prisma } from './lib/prisma';
import { ClubController } from './controllers/club';

const app = express();
const port = process.env.PORT || 5000;

const prismaRepository = new PrismaRepository(prisma);
const clubUseCases = new ClubUseCases(prismaRepository);
const clubController = new ClubController(clubUseCases);

app.use(express.json());

app.get('/', (req, res) => res.status(200).json({ message: 'Hello world!' }));
app.get('/clubs', (req, res) => clubController.getClubs(req, res));
app.get('/clubs/:id', async (req, res) => clubController.getClub(req, res));
app.post('/clubs', async (req, res) => clubController.createClub(req, res));
app.put('/clubs/:id', async (req, res) => clubController.updateClub(req, res));
app.delete('/clubs/:id', (req, res) => clubController.deleteClub(req, res));

app.listen(port, () => console.log(`App listening on port ${5000}`));
