import { PrismaClient } from '@prisma/client';

import { Club } from '../entities/club';
import { ClubRepository } from '../interfaces/club-repository';

export class PrismaRepository implements ClubRepository {
  constructor(private prisma: PrismaClient) {}

  async getAllClubs() {
    try {
      const clubs = await this.prisma.club.findMany();

      return clubs;
    } catch (error) {
      throw new Error('Something went wrong...');
    }
  }

  async getClub(id: string) {
    try {
      const club = await this.prisma.club.findFirst({ where: { id } });

      return club;
    } catch (error) {
      throw new Error('Something went wrong...');
    }
  }

  async createClub(data: Club) {
    try {
      const club = await this.prisma.club.create({ data });

      return club;
    } catch (error) {
      throw new Error('Something went wrong...');
    }
  }

  async updateClub(id: string, data: Club) {
    try {
      const club = await this.prisma.club.update({ where: { id }, data });

      return club;
    } catch (error) {
      throw new Error('Something went wrong...');
    }
  }

  async deleteClub(id: string) {
    try {
      await this.prisma.club.delete({ where: { id } });

      return true;
    } catch (error) {
      throw new Error('Something went wrong...');
    }
  }
}
