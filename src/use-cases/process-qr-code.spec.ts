import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryTurnstilesRepository } from '@/repositories/in-memory/in-memory-turnstiles-repository'
import { ProcessQRCodeUseCase } from './process-qr-code'
import { Prisma } from '@prisma/client'

let checkInsRepository: InMemoryCheckInsRepository
let usersRepository: InMemoryUsersRepository
let turnstilesRepository: InMemoryTurnstilesRepository
let sut: ProcessQRCodeUseCase

describe('Process QR Code Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    usersRepository = new InMemoryUsersRepository()
    turnstilesRepository = new InMemoryTurnstilesRepository()
    sut = new ProcessQRCodeUseCase(
      turnstilesRepository,
      usersRepository,
      checkInsRepository
    )

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to process a QR code and create a check-in', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    // Add balance to the user
    await usersRepository.updateBalance(user.id, new Prisma.Decimal(10))

    const turnstile = await turnstilesRepository.create('gym-01')

    const { message } = await sut.execute({
      userId: user.id,
      qrCode: turnstile.qrCode,
    })

    expect(message).toEqual('Check-in successful')
    expect(checkInsRepository.items).toHaveLength(1)
    expect(checkInsRepository.items[0].user_id).toEqual(user.id)
  })

  // Add more tests for other scenarios (e.g., insufficient balance, already checked in, etc.)
})