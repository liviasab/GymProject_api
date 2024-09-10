import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { UpdateGymUseCase } from "../update-gym";

export function makeUpdateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new UpdateGymUseCase(gymsRepository);
  return useCase;
}