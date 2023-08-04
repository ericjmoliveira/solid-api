import express from 'express';

import { ClubUseCases } from './use-cases/clubs';
import { PrismaRepository } from './repositories/prisma';

import { prisma } from './lib/prisma';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => res.status(200).json({ message: 'Hello world!' }));

app.get('/clubs', async (req, res) => {
  try {
    const prismaRepository = new PrismaRepository(prisma);
    const clubUseCases = new ClubUseCases(prismaRepository);

    const clubs = await clubUseCases.getAllClubs();

    if (clubs) {
      return res.status(200).json({ data: { clubs } });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/clubs/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const prismaRepository = new PrismaRepository(prisma);
    const clubUseCases = new ClubUseCases(prismaRepository);

    const club = await clubUseCases.getClub(id);

    if (!club) {
      return res.status(404).json({ error: 'Club not found' });
    }

    return res.status(200).json({ data: { club } });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/clubs', async (req, res) => {
  try {
    const { name, stadium, manager } = req.body;

    if (!name) return res.status(400).json({ error: 'Missing club name' });
    if (!stadium) return res.status(400).json({ error: 'Missing club stadium' });
    if (!manager) return res.status(400).json({ error: 'Missing club manager' });

    const prismaRepository = new PrismaRepository(prisma);
    const clubUseCases = new ClubUseCases(prismaRepository);

    const club = await clubUseCases.createClub({ name, stadium, manager });

    return res.status(201).json({ data: { club }, message: 'Club created' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/clubs/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const { name, stadium, manager } = req.body;

    if (!name && !stadium && !manager) {
      return res.status(400).json({ error: 'Missing update data' });
    }

    const prismaRepository = new PrismaRepository(prisma);
    const clubUseCases = new ClubUseCases(prismaRepository);

    const club = await clubUseCases.updateClub(id, { name, stadium, manager });

    return res.status(200).json({ data: { club }, message: 'Club updated' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/clubs/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const prismaRepository = new PrismaRepository(prisma);
    const clubUseCases = new ClubUseCases(prismaRepository);

    const deletedClub = await clubUseCases.deleteClub(id);

    if (deletedClub) {
      return res.status(200).json({ message: 'Club deleted' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => console.log(`App listening on port ${5000}`));
