import { GymsRepository } from "@/repositories/gyms-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { Gym } from "@prisma/client";

interface CreateGymUseCaseRequest {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
  ownerId: string;
}

interface CreateGymUseCaseResponse {
  gym: Gym;
}

// Remove this interface as it's not needed
// interface ExtendedUser extends User {
//   role?: string;
// }

export class CreateGymUseCase {
  constructor(
    private gymsRepository: GymsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
    ownerId,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const owner = await this.usersRepository.findById(ownerId);

    if (!owner || owner.role !== 'GYM_OWNER') {
      throw new Error('Only gym owners can create gyms');
    }

    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
      owner: {
        connect: { id: ownerId }
      }
    });

    return { gym };
  }
}