import { prisma } from "@/lib/prisma";
import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import dayjs from 'dayjs';

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({ data });
    return checkIn;
  }

  async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn[]> {
    const startOfDay = dayjs(date).startOf('day').toDate();
    const endOfDay = dayjs(date).endOf('day').toDate();

    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    return checkIns;
  }

  async countCheckInsByUserIdOnDate(userId: string, date: Date): Promise<number> {
    const startOfDay = dayjs(date).startOf('day').toDate();
    const endOfDay = dayjs(date).endOf('day').toDate();

    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    return count;
  }

  // ... outros métodos ...
}