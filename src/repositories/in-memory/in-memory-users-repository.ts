import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find(item => item.email === email)
    return user || null
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash || null, // Ensure it's never undefined
      created_at: new Date(),
      role: data.role ?? 'MEMBER',
      balance: new Prisma.Decimal(0),
    }

    this.items.push(user)

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find(item => item.id === id)
    return user || null
  }

  async updateRole(id: string, role: string): Promise<User> {
    const userIndex = this.items.findIndex(item => item.id === id)

    if (userIndex === -1) {
      throw new Error('User not found')
    }

    this.items[userIndex].role = role
    return this.items[userIndex]
  }

  async updateBalance(id: string, newBalance: Prisma.Decimal): Promise<User> {
    const userIndex = this.items.findIndex(item => item.id === id)

    if (userIndex === -1) {
      throw new Error('User not found')
    }

    this.items[userIndex].balance = newBalance
    return this.items[userIndex]
  }
}
