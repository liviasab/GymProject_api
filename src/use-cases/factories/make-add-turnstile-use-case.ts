import { PrismaTurnstilesRepository } from "@/repositories/prisma/prisma-turnstiles-repository";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { AddTurnstileUseCase } from "../add-turnstile";

export function makeAddTurnstileUseCase() {
  const turnstilesRepository = new PrismaTurnstilesRepository();
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new AddTurnstileUseCase(turnstilesRepository, gymsRepository);
  return useCase;
}