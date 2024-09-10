import { GymsRepository } from "@/repositories/gyms-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { GymMembersRepository } from "@/repositories/gym-members-repository";

interface RegisterToGymUseCaseRequest {
  gymId: string;
  userId: string;
}

export class RegisterToGymUseCase {
  constructor(
    private gymsRepository: GymsRepository,
    private usersRepository: UsersRepository,
    private gymMembersRepository: GymMembersRepository
  ) {}

  async execute({ gymId, userId }: RegisterToGymUseCaseRequest): Promise<void> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new Error('Gym not found');
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const isAlreadyMember = await this.gymMembersRepository.findByUserIdAndGymId(userId, gymId);

    if (isAlreadyMember) {
      throw new Error('User is already a member of this gym');
    }

    await this.gymMembersRepository.create({ userId, gymId });
  }
}