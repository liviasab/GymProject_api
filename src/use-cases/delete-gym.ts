import { GymsRepository } from "@/repositories/gyms-repository";

interface DeleteGymUseCaseRequest {
  id: string;
  userId: string;
}

export class DeleteGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ id, userId }: DeleteGymUseCaseRequest): Promise<void> {
    const isOwner = await this.gymsRepository.checkOwnership(id, userId);

    if (!isOwner) {
      throw new Error('User is not the owner of this gym');
    }

    await this.gymsRepository.delete(id);
  }
}