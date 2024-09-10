import { TurnstilesRepository } from "@/repositories/turnstiles-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { Turnstile } from "@prisma/client";

interface ListGymTurnstilesUseCaseRequest {
  gymId: string;
  ownerId: string;
}

interface ListGymTurnstilesUseCaseResponse {
  turnstiles: Turnstile[];
}

export class ListGymTurnstilesUseCase {
  constructor(
    private turnstilesRepository: TurnstilesRepository,
    private gymsRepository: GymsRepository
  ) {}

  async execute({ gymId, ownerId }: ListGymTurnstilesUseCaseRequest): Promise<ListGymTurnstilesUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new Error('Gym not found');
    }

    if (gym.ownerId !== ownerId) {
      throw new Error('Only the gym owner can list turnstiles');
    }

    const turnstiles = await this.turnstilesRepository.findManyByGymId(gymId);

    return { turnstiles };
  }
}