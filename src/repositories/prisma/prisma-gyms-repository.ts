import { prisma } from "@/lib/prisma";
import { GymsRepository } from "../gyms-repository";
import { Gym, Prisma } from "@prisma/client";

export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({ data });
    return gym;
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({ where: { id } });
    return gym;
  }

  async findMany(page: number): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      take: 20,
      skip: (page - 1) * 20,
    });
    return gyms;
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