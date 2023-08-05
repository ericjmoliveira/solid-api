import { Request, Response } from 'express';
import { ClubUseCases } from '../use-cases/clubs';

export class ClubController {
  constructor(private clubUseCases: ClubUseCases) {}

  async getClubs(req: Request, res: Response) {
    try {
      const clubs = await this.clubUseCases.getAllClubs();

      return res.status(200).json({ data: { clubs } });
    } catch (error) {
      return res.status(400).json({ error: 'Internal server error' });
    }
  }

  async getClub(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const club = await this.clubUseCases.getClub(id);

      if (!club) {
        return res.status(404).json({ error: 'Club not found' });
      }

      return res.status(200).json({ data: { club } });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createClub(req: Request, res: Response) {
    try {
      const { name, stadium, manager } = req.body;

      if (!name) return res.status(400).json({ error: 'Missing club name' });
      if (!stadium) return res.status(400).json({ error: 'Missing club stadium' });
      if (!manager) return res.status(400).json({ error: 'Missing club manager' });

      const club = await this.clubUseCases.createClub({ name, stadium, manager });

      return res.status(201).json({ data: { club }, message: 'Club created' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateClub(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const { name, stadium, manager } = req.body;

      if (!name && !stadium && !manager) {
        return res.status(400).json({ error: 'Missing update data' });
      }

      const club = await this.clubUseCases.updateClub(id, { name, stadium, manager });

      return res.status(200).json({ data: { club }, message: 'Club updated' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteClub(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const deletedClub = await this.clubUseCases.deleteClub(id);

      if (deletedClub) {
        return res.status(200).json({ message: 'Club deleted' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
