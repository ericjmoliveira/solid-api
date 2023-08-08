import { Club } from '../entities/club';
import { ClubRepository } from '../interfaces/club-repository';

export class ClubUseCases {
  constructor(private clubRepository: ClubRepository) {}

  getAllClubs() {
    return this.clubRepository.getAllClubs();
  }

  getClub(id: string) {
    return this.clubRepository.getClub(id);
  }

  createClub(data: Club) {
    return this.clubRepository.createClub(data);
  }

  updateClub(id: string, data: Club) {
    return this.clubRepository.updateClub(id, data);
  }

  deleteClub(id: string) {
    return this.clubRepository.deleteClub(id);
  }
}
