import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { DeleteGymUseCase } from "../delete-gym";

export function makeDeleteGymUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new DeleteGymUseCase(gymsRepository);
  return useCase;
}