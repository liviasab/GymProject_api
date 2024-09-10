import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let usersRepository: InMemoryUsersRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateGymUseCase(gymsRepository, usersRepository)
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
  })

  it('should not be able to create a gym if user is not a gym owner', async () => {
    const owner = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
      role: 'MEMBER'
    })

    await expect(() =>
      sut.execute({
        title: 'JavaScript Gym',
        description: 'Some description',
        phone: '1199999999',
        latitude: -23.5505199,
        longitude: -46.6333094,
        ownerId: owner.id
      })
    ).rejects.toThrow('Only gym owners can create gyms')
  })
})