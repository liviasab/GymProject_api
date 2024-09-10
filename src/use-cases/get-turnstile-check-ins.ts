import { TurnstilesRepository } from "@/repositories/turnstiles-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface GetTurnstileCheckInsUseCaseRequest {
  turnstileId: string;
  ownerId: string;
  page: number;
}

interface GetTurnstileCheckInsUseCaseResponse {
  checkIns: CheckIn[];
}

export class GetTurnstileCheckInsUseCase {
  constructor(
    private turnstilesRepository: TurnstilesRepository,
    private gymsRepository: GymsRepository,
    private checkInsRepository: CheckInsRepository
  ) {}

  async execute({ turnstileId, ownerId, page }: GetTurnstileCheckInsUseCaseRequest): Promise<GetTurnstileCheckInsUseCaseResponse> {
    const turnstile = await this.turnstilesRepository.findById(turnstileId);

    if (!turnstile) {
      throw new Error('Turnstile not found');
    }

    const gym = await this.gymsRepository.findById(turnstile.gymId);

    if (!gym || gym.ownerId !== ownerId) {
      throw new Error('Unauthorized');
    }

    const checkIns = await this.checkInsRepository.findManyByTurnstileId(turnstileId, page);

    return { checkIns };
  }
}