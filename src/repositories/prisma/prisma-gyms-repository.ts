import { prisma } from "@/lib/prisma";
import { Gym, Prisma } from "@prisma/client";
import { GymsRepository } from "../gyms-repository";

export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({ data });
    return gym;
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({ where: { id } });
    return gym;
  }

  async findMany(page: number, per_page: number, search?: string): Promise<{ gyms: Gym[], total: number }> {
    const skip = (page - 1) * per_page;

    const [gyms, total] = await prisma.$transaction([
      prisma.gym.findMany({
        where: search ? {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        } : undefined,
        take: per_page,
        skip,
      }),
      prisma.gym.count({
        where: search ? {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        } : undefined,
      }),
    ]);

    return { gyms, total };
  }

  async update(id: string, data: Prisma.GymUpdateInput): Promise<Gym> {
    const gym = await prisma.gym.update({ where: { id }, data });
    return gym;
  }

  async delete(id: string): Promise<void> {
    await prisma.gym.delete({ where: { id } });
  }

  async findManyByOwnerId(ownerId: string, page: number): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      where: { ownerId },
      take: 20,
      skip: (page - 1) * 20,
    });
    return gyms;
  }

  async checkOwnership(id: string, ownerId: string): Promise<boolean> {
    const gym = await prisma.gym.findUnique({
      where: { id },
      select: { ownerId: true },
    });
    return gym?.ownerId === ownerId;
  }
}