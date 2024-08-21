import {InMemoryUsersRepository} from '@/repositories/in-memory/in-memory-users-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from "bcrypt"
import { InvalidCredentialsError } from './errors/invalid-credentials-error'


let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
 beforeEach(()=> {
  usersRepository = new InMemoryUsersRepository()
  sut = new AuthenticateUseCase (usersRepository)
 })
  
  it('should not be able to authenticate', async () => {
    
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
await expect(() => sut.execute({
    email: 'johndoe@example.com',
    password: '123456'
  }),
).rejects.toBeInstanceOf(InvalidCredentialsError)

})
  it('should not be able to autenticate with wrong password', async () => {


  await usersRepository.create({
    name:'John Doe',
    email:'johndoe@example.com',
    password_hash: await hash('123456', 6),
  })
await expect(() => 
  sut.execute({
  email: 'johndoe@example.com',
  password: '123123'
}),
).rejects.toBeInstanceOf(InvalidCredentialsError)

})
})


  