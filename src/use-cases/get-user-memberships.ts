import { GymMembersRepository } from "@/repositories/gym-members-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface GetUserMembershipsUseCaseRequest {
  userId: string;
  page: number;
  per_page: number;
}

interface Membership {
  gym: Gym;
  joinedAt: Date;
}

interface GetUserMembershipsUseCaseResponse {
  memberships: Membership[];
  total: number;
  total_pages: number;
}

export class GetUserMembershipsUseCase {
  constructor(
    private gymMembersRepository: GymMembersRepository,
    private gymsRepository: GymsRepository
  ) {}

  async execute({ userId, page, per_page }: GetUserMembershipsUseCaseRequest): Promise<GetUserMembershipsUseCaseResponse> {
    const { memberships, total } = await this.gymMembersRepository.findManyByUserId(userId, page, per_page);

    const membershipWithGyms = await Promise.all(
      memberships.map(async (membership) => ({
        gym: await this.gymsRepository.findById(membership.gymId),
        joinedAt: membership.createdAt,
      }))
    );

    const total_pages = Math.ceil(total / per_page);

    return { memberships: membershipWithGyms, total, total_pages };
  }
}