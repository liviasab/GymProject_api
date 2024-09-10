import { TurnstilesRepository } from "@/repositories/turnstiles-repository";
import { GymsRepository } from "@/repositories/gyms-repository";

interface DeleteTurnstileUseCaseRequest {
  turnstileId: string;
  userId: string;
}

export class DeleteTurnstileUseCase {
  constructor(
    private turnstilesRepository: TurnstilesRepository,
    private gymsRepository: GymsRepository
  ) {}

  async execute({ turnstileId, userId }: DeleteTurnstileUseCaseRequest): Promise<void> {
    const turnstile = await this.turnstilesRepository.findById(turnstileId);

    if (!turnstile) {
      throw new Error('Turnstile not found');
    }

    const gym = await this.gymsRepository.findById(turnstile.gymId);

    if (!gym || gym.ownerId !== userId) {
      throw new Error('User is not the owner of this gym');
    }

    await this.turnstilesRepository.delete(turnstileId);
  }
}