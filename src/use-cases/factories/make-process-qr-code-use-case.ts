import { PrismaTurnstilesRepository } from "@/repositories/prisma/prisma-turnstiles-repository"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { ProcessQRCodeUseCase } from "../process-qr-code"

export function makeProcessQRCodeUseCase() {
  const turnstilesRepository = new PrismaTurnstilesRepository()
  const usersRepository = new PrismaUsersRepository()
  const checkInsRepository = new PrismaCheckInsRepository()

  const processQRCodeUseCase = new ProcessQRCodeUseCase(
    turnstilesRepository,
    usersRepository,
    checkInsRepository
  )

  return processQRCodeUseCase
}