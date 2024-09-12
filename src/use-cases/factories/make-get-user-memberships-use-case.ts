import { PrismaGymMembersRepository } from "@/repositories/prisma/prisma-gym-members-repository";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { GetUserMembershipsUseCase } from "../get-user-memberships";

export function makeGetUserMembershipsUseCase() {
  const gymMembersRepository = new PrismaGymMembersRepository();
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new GetUserMembershipsUseCase(gymMembersRepository, gymsRepository);
  return useCase;
}