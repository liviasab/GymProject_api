import { Gym, Prisma } from "@prisma/client";

export interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  findById(id: string): Promise<Gym | null>;
  findMany(page: number): Promise<Gym[]>;
  update(id: string, data: Prisma.GymUpdateInput): Promise<Gym>;
  delete(id: string): Promise<void>;
  findManyByOwnerId(ownerId: string, page: number): Promise<Gym[]>;
  checkOwnership(id: string, ownerId: string): Promise<boolean>;
}