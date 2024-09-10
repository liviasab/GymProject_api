import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { FetchUserGymsUseCase } from "../fetch-user-gyms";

export function makeFetchUserGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new FetchUserGymsUseCase(gymsRepository);
  return useCase;
}