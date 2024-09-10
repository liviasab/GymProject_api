import { Prisma, User } from "@prisma/client";

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  findById(id: string): Promise<User | null>;
  updateRole(id: string, role: string): Promise<User>;
  updateBalance(id: string, newBalance: Prisma.Decimal): Promise<User>;
}