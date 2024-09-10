import { PrismaTurnstilesRepository } from "@/repositories/prisma/prisma-turnstiles-repository";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { ListGymTurnstilesUseCase } from "../list-gym-turnstiles";

export function makeListGymTurnstilesUseCase() {
  const turnstilesRepository = new PrismaTurnstilesRepository();
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new ListGymTurnstilesUseCase(turnstilesRepository, gymsRepository);

  return useCase;
}