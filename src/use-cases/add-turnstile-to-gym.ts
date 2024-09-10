import { TurnstilesRepository } from "@/repositories/turnstiles-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { Turnstile } from "@prisma/client";

interface AddTurnstileToGymUseCaseRequest {
  gymId: string;
  ownerId: string;
}

interface AddTurnstileToGymUseCaseResponse {
  turnstile: Turnstile;
}

export class AddTurnstileToGymUseCase {
  constructor(
    private turnstilesRepository: TurnstilesRepository,
    private gymsRepository: GymsRepository
  ) {}

  async execute({ gymId, ownerId }: AddTurnstileToGymUseCaseRequest): Promise<AddTurnstileToGymUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new Error('Gym not found');
    }

    if (gym.ownerId !== ownerId) {
      throw new Error('Only the gym owner can add turnstiles');
    }

    const turnstile = await this.turnstilesRepository.create(gymId);

    return { turnstile };
  }
}