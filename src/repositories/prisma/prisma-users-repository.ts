import { prisma } from "@/lib/prisma";
import { Prisma, User } from '@prisma/client'
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository{
  async findByEmail(email: string){
    const user = await prisma.user.findUnique({
      where: {
          email,
      },
    })
    return user
  }
  async create (data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
  });
 
  return user
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async updateRole(id: string, role: string): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: { role },
    });
  }

  async updateBalance(id: string, newBalance: Prisma.Decimal): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: { balance: newBalance },
    });
  }
}
