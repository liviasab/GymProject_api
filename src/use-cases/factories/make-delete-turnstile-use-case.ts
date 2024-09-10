import { PrismaTurnstilesRepository } from "@/repositories/prisma/prisma-turnstiles-repository";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { DeleteTurnstileUseCase } from "../delete-turnstile";

export function makeDeleteTurnstileUseCase() {
  const turnstilesRepository = new PrismaTurnstilesRepository();
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new DeleteTurnstileUseCase(turnstilesRepository, gymsRepository);
  return useCase;
}