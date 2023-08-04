import { Club } from '../entities/club';
import { ClubRepository } from '../interfaces/club-repository';

export class ClubUseCases {
  constructor(private clubRepository: ClubRepository) {}

  async getAllClubs() {
    return this.clubRepository.getAllClubs();
  }

  async getClub(id: string) {
    return this.clubRepository.getClub(id);
  }

  async createClub(data: Club) {
    return this.clubRepository.createClub(data);
  }

  async updateClub(id: string, data: Club) {
    return this.clubRepository.updateClub(id, data);
  }

  async deleteClub(id: string) {
    return this.clubRepository.deleteClub(id);
  }
}
