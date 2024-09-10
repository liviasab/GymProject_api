import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym, Prisma } from "@prisma/client";

interface UpdateGymUseCaseRequest {
  id: string;
  data: Prisma.GymUpdateInput;
  userId: string;
}

interface UpdateGymUseCaseResponse {
  gym: Gym;
}

export class UpdateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ id, data, userId }: UpdateGymUseCaseRequest): Promise<UpdateGymUseCaseResponse> {
    const isOwner = await this.gymsRepository.checkOwnership(id, userId);

    if (!isOwner) {
      throw new Error('User is not the owner of this gym');
    }

    const gym = await this.gymsRepository.update(id, data);

    return { gym };
  }
}