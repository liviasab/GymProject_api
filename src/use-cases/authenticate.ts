import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcrypt";
import { User } from "@prisma/client";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponde{
  user: User;
}




export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository,
  ) {}

  async execute( {
    email, 
    password,
  } : AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponde> {
      const user = await this.usersRepository.findByEmail(email);
      
      if(!user?.password_hash) {
        throw new InvalidCredentialsError();

      }
      const doesPasswordMatch = await compare(password, user.password_hash);
      
      if(!doesPasswordMatch) {
        throw new InvalidCredentialsError();
      }
      return {
        user,
      };
    }

}