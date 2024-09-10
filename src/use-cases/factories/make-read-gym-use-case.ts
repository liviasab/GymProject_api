import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { ReadGymUseCase } from "../read-gym";

export function makeReadGymUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new ReadGymUseCase(gymsRepository);
  return useCase;
}