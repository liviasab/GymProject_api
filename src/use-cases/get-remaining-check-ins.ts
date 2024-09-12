import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface GetRemainingCheckInsUseCaseRequest {
  userId: string;
  date: Date;
}

interface GetRemainingCheckInsUseCaseResponse {
  remainingCheckIns: number;
}

export class GetRemainingCheckInsUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository
  ) {}

  async execute({ userId, date }: GetRemainingCheckInsUseCaseRequest): Promise<GetRemainingCheckInsUseCaseResponse> {
    const checkInsToday = await this.checkInsRepository.countCheckInsByUserIdOnDate(
      userId,
      date
    );

    const remainingCheckIns = Math.max(0, 2 - checkInsToday);

    return { remainingCheckIns };
  }
}