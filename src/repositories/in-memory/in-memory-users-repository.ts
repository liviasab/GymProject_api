import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { v4 as uuidv4 } from 'uuid';  // Para gerar IDs únicos

export class InMemoryUsersRepository implements UsersRepository {
  public itens: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    const user = this.itens.find(item => item.email === email)
    
    if (!user) {
      return null
    }
    return user
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: uuidv4(), // Gerando um ID único
      name: data.name,
      email: data.email,
      password_hash: data.password_hash || null, // Garantindo que seja string ou null, nunca undefined
      created_at: new Date(),
    }
    this.itens.push(user)

    return user
  }
}
