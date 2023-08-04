import { Club } from '../entities/club';

export interface ClubRepository {
  getAllClubs(): Promise<Club[]>;
  getClub(id: string): Promise<Club | null>;
  createClub(data: Club): Promise<Club>;
  updateClub(id: string, data: Club): Promise<Club>;
  deleteClub(id: string): Promise<boolean>;
}
