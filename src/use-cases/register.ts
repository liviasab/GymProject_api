import { hash } from "bcrypt";
import { UsersRepository } from "@/repositories/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { User } from "@prisma/client";

interface RegisterUserCaseRequest {
  name: string
  email: string
  password: string
  role: 'MEMBER' | 'GYM_OWNER'
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}
  
  async execute({
    name,
    email,
    password,
    role,
  }: RegisterUserCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)
    
    const userWithSameEmail = await this.usersRepository.findByEmail(email)
  
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }
   
    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      role,
    })
    
    return {
      user,
    }
  }
}
