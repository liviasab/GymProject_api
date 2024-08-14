import {InMemoryUsersRepository} from '@/repositories/in-memory/in-memory-users-repository'
import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { AuthenticateUseCase } from './authenticate'
import { hash } from "bcrypt"
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)
    
    await usersRepository.create({
      name:'John Doe',
      email:'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })
    
    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })
    
    expect(user.id).toEqual(expect.any(String))
  })
  
  
  it('should not be able to autenticate with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

  
expect(() => sut.execute({
    email: 'johndoe@example.com',
    password: '123456'
  }),
).rejects.toBeInstanceOf(InvalidCredentialsError)

})
  it('should not be able to autenticate with wrong password', async () => {
  const usersRepository = new InMemoryUsersRepository()
  const sut = new AuthenticateUseCase(usersRepository)

  await usersRepository.create({
    name:'John Doe',
    email:'johndoe@example.com',
    password_hash: await hash('123456', 6),
  })
expect(() => 
  sut.execute({
  email: 'johndoe@example.com',
  password: '123123'
}),
).rejects.toBeInstanceOf(InvalidCredentialsError)

})
})


  