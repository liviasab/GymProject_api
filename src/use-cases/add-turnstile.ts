import { TurnstilesRepository } from "@/repositories/turnstiles-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { Turnstile } from "@prisma/client";

interface AddTurnstileUseCaseRequest {
  gymId: string;
  ownerId: string;
}

interface AddTurnstileUseCaseResponse {
  turnstile: Turnstile;
}

export class AddTurnstileUseCase {
  constructor(
    private turnstilesRepository: TurnstilesRepository,
    private gymsRepository: GymsRepository
  ) {}

  async execute({ gymId, ownerId }: AddTurnstileUseCaseRequest): Promise<AddTurnstileUseCaseResponse> {
    console.log('Executing AddTurnstileUseCase with gymId:', gymId, 'and ownerId:', ownerId);

    const gym = await this.gymsRepository.findById(gymId);
    console.log('Gym found:', gym);

    if (!gym) {
      throw new Error('Gym not found');
    }

    if (gym.ownerId !== ownerId) {
      throw new Error('Only the gym owner can add turnstiles');
    }

    const turnstile = await this.turnstilesRepository.create(gymId);
    console.log('Turnstile created:', turnstile);

    return { turnstile };
  }
}