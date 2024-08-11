import bcrypt  from "bcrypt";
import { prisma } from "@/lib/prisma";


interface registerUserCaseRequest {
  name: string
  email: string
  password: string
}
export async function registerUserCase({
  name,
  email,
  password,
}: registerUserCaseRequest) {
  
  const saltRounds = 6;
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
        email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  await prisma.user.create({
      data: {
          name,
          email,
          password_hash: hashedPassword,
      }
  });
}