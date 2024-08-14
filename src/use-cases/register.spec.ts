import {InMemoryUsersRepository} from '@/repositories/in-memory/in-memory-users-repository'
import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcrypt'
import { rejects } from 'assert'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case', () => {
  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })
    
    expect(user.id).toEqual(expect.any(String))
  })
  
  
    it('should not be able to register with same email twice', async () => {
      const usersRepository = new InMemoryUsersRepository()
      const registerUseCase = new RegisterUseCase(usersRepository)
  
      const email = 'johndoe@example.com'
    
  await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })


    await expect(() =>
      registerUseCase.execute ({
      name: 'John Doe',
      email,
      password: '123456',
    }),
  ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  
  })
})
