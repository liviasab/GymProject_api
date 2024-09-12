import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInsRepository {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn[]>;
    countCheckInsByUserIdOnDate(userId: string, date: Date): Promise<number>;
    // ... outros métodos ...
}