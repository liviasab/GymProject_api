import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { PrismaTurnstilesRepository } from "@/repositories/prisma/prisma-turnstiles-repository";
import { DeleteGymUseCase } from "../delete-gym";

export function makeDeleteGymUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const turnstilesRepository = new PrismaTurnstilesRepository();
  const useCase = new DeleteGymUseCase(gymsRepository, turnstilesRepository);
  return useCase;
}