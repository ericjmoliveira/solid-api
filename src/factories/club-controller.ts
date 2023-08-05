import { PrismaRepository } from '../repositories/prisma';
import { prisma } from '../lib/prisma';
import { ClubUseCases } from '../use-cases/clubs';
import { ClubController } from '../controllers/club';

export function makeClubController(): ClubController {
  const prismaRepository = new PrismaRepository(prisma);
  const clubUseCases = new ClubUseCases(prismaRepository);
  const clubController = new ClubController(clubUseCases);

  return clubController;
}
