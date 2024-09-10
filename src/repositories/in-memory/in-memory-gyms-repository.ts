import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      ownerId: data.ownerId,
    }

    this.items.push(gym)

    return gym
  }

  async findById(id: string) {
    const gym = this.items.find(item => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async findMany(page: number) {
    return this.items.slice((page - 1) * 20, page * 20)
  }

  async update(id: string, data: Prisma.GymUpdateInput) {
    const gymIndex = this.items.findIndex(item => item.id === id)

    if (gymIndex >= 0) {
      this.items[gymIndex] = {
        ...this.items[gymIndex],
        ...data,
      }
    }

    return this.items[gymIndex]
  }

  async delete(id: string) {
    const gymIndex = this.items.findIndex(item => item.id === id)

    if (gymIndex >= 0) {
      this.items.splice(gymIndex, 1)
    }
  }
}