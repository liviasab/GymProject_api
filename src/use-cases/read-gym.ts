import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface ReadGymUseCaseRequest {
  id: string;
}

interface ReadGymUseCaseResponse {
  gym: Gym;
}

export class ReadGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ id }: ReadGymUseCaseRequest): Promise<ReadGymUseCaseResponse> {
    const gym = await this.gymsRepository.findById(id);

    if (!gym) {
      throw new Error('Gym not found');
    }

    return { gym };
  }
}