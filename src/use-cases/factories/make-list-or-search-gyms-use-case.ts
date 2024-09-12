import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { ListOrSearchGymsUseCase } from "../list-or-search-gyms";

export function makeListOrSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new ListOrSearchGymsUseCase(gymsRepository);

  return useCase;
}