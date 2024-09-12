import { GymsRepository } from "@/repositories/gyms-repository";
import { TurnstilesRepository } from "@/repositories/turnstiles-repository";

interface DeleteGymUseCaseRequest {
  id: string;
  userId: string;
}

export class DeleteGymUseCase {
  constructor(
    private gymsRepository: GymsRepository,
    private turnstilesRepository: TurnstilesRepository
  ) {}

  async execute({ id, userId }: DeleteGymUseCaseRequest): Promise<void> {
    const isOwner = await this.gymsRepository.checkOwnership(id, userId);

    if (!isOwner) {
      throw new Error('User is not the owner of this gym');
    }

    // Primeiro, delete todas as catracas associadas
    const turnstiles = await this.turnstilesRepository.findManyByGymId(id);
    for (const turnstile of turnstiles) {
      await this.turnstilesRepository.delete(turnstile.id);
    }

    // Depois, delete a academia
    await this.gymsRepository.delete(id);
  }
}