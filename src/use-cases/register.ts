import bcrypt, { hash }  from "bcrypt";
import { prisma } from "@/lib/prisma";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";


interface RegisterUserCaseRequest {
  name: string
  email: string
  password: string
}
export async function registerUserCase({
  name,
  email,
  password,
}: RegisterUserCaseRequest) {
  const password_hash = await hash(password, 6)
  
  

const userWithSameEmail = await prisma.user.findUnique({
    where: {
        email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists.')
  }
 const prismaUsersRepository = new PrismaUsersRepository()

 await prismaUsersRepository.create({
  name,
  email,
  password_hash,
 })
  
}
