import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaGymMembersRepository } from "@/repositories/prisma/prisma-gym-members-repository";
import { RegisterToGymUseCase } from "../register-to-gym";

export function makeRegisterToGymUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const usersRepository = new PrismaUsersRepository();
  const gymMembersRepository = new PrismaGymMembersRepository();
  const useCase = new RegisterToGymUseCase(gymsRepository, usersRepository, gymMembersRepository);
  return useCase;
}