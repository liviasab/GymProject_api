import { prisma } from "@/lib/prisma";
import { Prisma, GymMember } from "@prisma/client";
import { GymMembersRepository } from "../gym-members-repository";

export class PrismaGymMembersRepository implements GymMembersRepository {
  async create(data: Prisma.GymMemberUncheckedCreateInput): Promise<GymMember> {
    const gymMember = await prisma.gymMember.create({
      data,
    });
    return gymMember;
  }

  async findByUserIdAndGymId(userId: string, gymId: string): Promise<GymMember | null> {
    const gymMember = await prisma.gymMember.findUnique({
      where: {
        userId_gymId: {
          userId,
          gymId,
        },
      },
    });
    return gymMember;
  }
}