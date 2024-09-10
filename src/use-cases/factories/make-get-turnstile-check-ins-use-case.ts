import { PrismaTurnstilesRepository } from "@/repositories/prisma/prisma-turnstiles-repository";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { GetTurnstileCheckInsUseCase } from "../get-turnstile-check-ins";

export function makeGetTurnstileCheckInsUseCase() {
  const turnstilesRepository = new PrismaTurnstilesRepository();
  const gymsRepository = new PrismaGymsRepository();
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new GetTurnstileCheckInsUseCase(turnstilesRepository, gymsRepository, checkInsRepository);
  return useCase;
}