import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface FetchUserGymsUseCaseRequest {
  userId: string;
  page: number;
}

interface FetchUserGymsUseCaseResponse {
  gyms: Gym[];
}

export class FetchUserGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ userId, page }: FetchUserGymsUseCaseRequest): Promise<FetchUserGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyByOwnerId(userId, page);

    return { gyms };
  }
}