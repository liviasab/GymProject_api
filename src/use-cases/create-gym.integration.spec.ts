import { expect, describe, it, beforeAll, afterAll } from 'vitest'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateGymUseCase } from './create-gym'
import { prisma } from '@/lib/prisma'

describe('Create Gym Use Case (Integration)', () => {
  let gymsRepository: PrismaGymsRepository
  let usersRepository: PrismaUsersRepository
  let sut: CreateGymUseCase

  beforeAll(() => {
    gymsRepository = new PrismaGymsRepository()
    usersRepository = new PrismaUsersRepository()
    sut = new CreateGymUseCase(gymsRepository, usersRepository)
  })

  afterAll(async () => {
    await prisma.gym.deleteMany()
    await prisma.user.deleteMany()
  })

  it('should be able to create a gym', async () => {
    const owner = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
      role: 'GYM_OWNER'
    })

    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: 'Some description',
      phone: '1199999999',
      latitude: -23.5505199,
      longitude: -46.6333094,
      ownerId: owner.id
    })

    expect(gym.id).toEqual(expect.any(String))

    const createdGym = await prisma.gym.findUnique({
      where: { id: gym.id }
    })

    expect(createdGym).toBeTruthy()
  })
})