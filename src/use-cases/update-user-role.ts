import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";

interface UpdateUserRoleUseCaseRequest {
  userId: string;
  role: 'MEMBER' | 'GYM_OWNER' | 'ADMIN';
}

interface UpdateUserRoleUseCaseResponse {
  user: User;
}

export class UpdateUserRoleUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId, role }: UpdateUserRoleUseCaseRequest): Promise<UpdateUserRoleUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = await this.usersRepository.updateRole(userId, role);

    return { user: updatedUser };
  }
}