import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { GetRemainingCheckInsUseCase } from "../get-remaining-check-ins";

export function makeGetRemainingCheckInsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new GetRemainingCheckInsUseCase(checkInsRepository)

  return useCase
}