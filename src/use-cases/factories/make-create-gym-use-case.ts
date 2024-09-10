import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { CreateGymUseCase } from "../create-gym";

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const usersRepository = new PrismaUsersRepository();
  const useCase = new CreateGymUseCase(gymsRepository, usersRepository);
  return useCase;
}