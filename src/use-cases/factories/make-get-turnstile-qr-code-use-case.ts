import { PrismaTurnstilesRepository } from "@/repositories/prisma/prisma-turnstiles-repository";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { GetTurnstileQRCodeUseCase } from "../get-turnstile-qr-code";

export function makeGetTurnstileQRCodeUseCase() {
  const turnstilesRepository = new PrismaTurnstilesRepository();
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new GetTurnstileQRCodeUseCase(turnstilesRepository, gymsRepository);
  return useCase;
}